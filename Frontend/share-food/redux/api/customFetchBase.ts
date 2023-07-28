import {
  BaseQueryFn,
} from '@reduxjs/toolkit/query';
import { request, gql, ClientError } from 'graphql-request'
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { Mutex } from 'async-mutex';
import { logoutApp } from '../login';  
import { RootState } from '../store';
const baseUrl = `https://daily-groceries.fly.dev/dailygroceries/graphql/subscriptions`;

const baseQuery = graphqlRequestBaseQuery({
  url: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).login.userToken;
    console.log("token",token);
    if (token) {
        headers.set('authorization', `${token}`)
    }
    return headers
},
});

const customFetchBase: BaseQueryFn = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  let result = await baseQuery(args, api, extraOptions);
  // console.log("tutut",result.error?.message.includes("invalid signature"));
  if (result.error?.message.includes('Not Authorised') || result.error?.message.includes("invalid signature")) {
      api.dispatch(logoutApp());
  }
  

  return result;
};

export default customFetchBase;

