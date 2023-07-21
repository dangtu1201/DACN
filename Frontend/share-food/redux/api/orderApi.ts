import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { setOrdersProcessing } from '../ordersProcessing';
import { setOrdersHistory } from '../ordersHistory';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: customFetchBase,
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (credentials) => ({  
                document: `mutation Mutation($input: createPayment) {
                    createPayment(input: $input) {
                      status
                    }
                  }
                `,
                variables: credentials
            }),
            invalidatesTags: ['Order'],
        }),
        getOrder: builder.query({
            query: (credentials) => ({
                document: `uery GetPayments($input: Payment_) {
                    getPayments(input: $input) {
                      _id
                      shop {
                        shopName
                        address
                      }
                      createAt
                      status
                      total
                    }
                  }
                `,
                variables: credentials
            }),
            providesTags: ['Order'],
        }),
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
                document: `query GetPayments($input: Payment_) {
                    getPayments(input: $input) {
                      _id
                      shop {
                        shopName
                        address
                      }
                      createAt
                      total
                      status
                    }
                  }
                `,
                variables: credentials
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setOrdersProcessing(data.getPayments));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Order'],
        }),
        getOrderHistory: builder.query({
            query: (credentials) => ({
                document: `query GetPayments($input: Payment_) {
                    getPayments(input: $input) {
                        _id
                        shop {
                            shopName
                            address
                        }
                        createAt
                        status
                        total
                        }
                    }
                `,
                variables: credentials
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setOrdersHistory(data.getPayments));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Order'],
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderQuery, useUpdateOrderMutation, useGetOrderProcessingQuery, useGetOrderHistoryQuery } = orderApi;