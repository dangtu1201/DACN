import { createApi } from '@reduxjs/toolkit/query/react';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { RootState } from '../store';
import customFetchBase from './customFetchBase'
import { setUserInfo } from '../user';

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
        document: `mutation CreateUser($input: createUser) {
          createUser(input: $input) {
            _id
            email
            phone
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
        document: `query GetUser {
          getUser {
            email
            phone
            name
            image
          }
        }`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data.getUser));
        } catch (err) {
          console.log(err);
        }
      },

      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUserInfo: builder.mutation({
      query: (user) => ({
        document: `mutation UpdateUser($input: updateUser) {
          updateUser(input: $input) {
            email
            phone
            _id
            name
          }
        }
        `,
        variables: user,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getUserPassword: builder.query({
      query: () => ({
        document: `query GetUser {
          getUser {
            password
          }
        }`,
      }),
    }),
    getUserByPhone: builder.query({
      query: (phone) => ({
        document: `query Users($phone: String) {
          users(phone: $phone) {
            phone
          }
        }
        `,
        variables: phone,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateUserInfoMutation,
  useGetUserPasswordQuery,
  useGetUserByPhoneQuery,
} = authApi;