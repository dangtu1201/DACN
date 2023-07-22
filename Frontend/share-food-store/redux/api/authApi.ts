import { createApi } from '@reduxjs/toolkit/query/react';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { RootState } from '../store';
import customFetchBase from './customFetchBase'
import { setShop } from '../shop';
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
    shop: builder.query({
      query: () => ({
        document: `query GetShop {
          getShop {
            shopName
            address
            _id
            status
          }
        }`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setShop(data.getShop));
          }
        } catch (err) {
          console.log(err);
        }
      },
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
    createShop: builder.mutation({
      query: (shop) => ({
        document: `mutation CreateShop($input: createShop) {
          createShop(input: $input) {
            shopOwner {
              email
              phone
            }
            _id
            status
          }
        }
        `,
        variables: shop,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
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
    updateShop: builder.mutation({
      query: (shop) => ({
        document: `mutation UpdateShop($input: updateShop) {
          updateShop(input: $input) {
            shopName
          }
        }
        `,
        variables: shop,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
  useShopQuery,
  useCreateShopMutation,
  useUpdateUserInfoMutation,
  useUpdateShopMutation,
  useGetUserPasswordQuery,
} = authApi;