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
        updateOrder: builder.mutation({
            query: (credentials) => ({
                document: `mutation UpdatePayment($input: updatePayment, $id: ID!) {
                    updatePayment(input: $input, ID: $id) {
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
        getOrderByID: builder.query({
            query: (credentials) => ({
                document: `query GetPaymentById($id: ID) {
                    getPaymentById(ID: $id) {
                      _id
                      products {
                        product {
                          _id
                          name
                          price_old
                          price
                          activeTime {
                            from
                            to
                          }
                          status
                          image
                        }
                        quantity
                      }
                      shop {
                        _id
                        shopName
                        address
                        coordinates {
                          lat
                          long
                        }
                        shopOwner {
                          phone
                        }
                        status
                      }
                      total
                      status
                      paymentMethod
                    }
                  }
                `,
                variables: credentials
                }),
            providesTags: ['Order'],
        }),

    }),
});

export const { useCreateOrderMutation, useUpdateOrderMutation, useGetOrderProcessingQuery, useGetOrderHistoryQuery, useGetOrderByIDQuery } = orderApi;