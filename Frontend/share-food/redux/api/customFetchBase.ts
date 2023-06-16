import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query';
  import { Mutex } from 'async-mutex';
    import { logoutApp } from '../login';  
  const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/`;
  
  // Create a new mutex
  const mutex = new Mutex();
  
  const baseQuery = fetchBaseQuery({
    baseUrl,
  });
  
  const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if ((result.error?.data as any)?.message === 'Invalid Access Token!') {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
  
        try {
          const refreshResult = await baseQuery(
            { credentials: 'include', url: 'refresh' },
            api,
            extraOptions
          );
  
          if (refreshResult.data) {
            // Retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logoutApp());
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  
    return result;
  };
  
  export default customFetchBase;
  
  