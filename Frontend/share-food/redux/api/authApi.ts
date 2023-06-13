import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      }
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;

