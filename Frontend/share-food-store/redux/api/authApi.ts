import { createApi } from '@reduxjs/toolkit/query/react';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { RootState } from '../store';
import customFetchBase from './customFetchBase'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        document: `mutation Mutation($input: loginInput) {
          Login(input: $input) {
            refreshToken
            userID
          }
        }`,
        variables: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        document: `mutation register($name: String!, $email: String!, $password: String!) {
          register(name: $name, email: $email, password: $password) {
            token 
            user {
              id
              name
              email
              role
            }
          }
        }`,
        variables: credentials,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    logout: builder.mutation({
      query: () => ({
        document: `mutation logout {
          logout
        }`,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    me: builder.query({
      query: () => ({
        document: `query me {
          me {
            id
            name
            email
            role
          }
        }`,
      }),
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;