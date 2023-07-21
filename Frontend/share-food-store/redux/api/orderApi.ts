import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { setOrdersProcessing } from '../ordersProcessing';
import { setOrdersHistory } from '../ordersHistory';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: customFetchBase,
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        updateOrder: builder.mutation({
            query: (credentials) => ({
                document: `mutation UpdatePayment($input: updatePayment) {
                    updatePayment(input: $input) {
                      total
                      _id
                    }
                  }
                `,
                variables: credentials
            }),
            invalidatesTags: ['Order'],
        }),
        getOrderProcessing: builder.query({
            query: (credentials) => ({
                document: `query GetPaymentsShop($input: Payment_) {
                    getPaymentsShop(input: $input) {
                      _id
                      user {
                        name
                        phone
                      }
                      total
                      createAt
                    }
                  }
                `,
                variables: credentials
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setOrdersProcessing(data.getPaymentsShop));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Order'],
        }),
        getOrderHistory: builder.query({
            query: (credentials) => ({
                document: `query GetPaymentsShop($input: Payment_) {
                    getPaymentsShop(input: $input) {
                      _id
                      user {
                        name
                        phone
                      }
                      total
                      createAt
                    }
                  }
                `,
                variables: credentials
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setOrdersHistory(data.getPaymentsShop));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Order'],
        }),
    }),
});

export const { useUpdateOrderMutation, useGetOrderProcessingQuery, useGetOrderHistoryQuery } = orderApi;