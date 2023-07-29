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
                      isReviewed
                      status
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
                    }
                    total
                    status
                    isReviewed
                    paymentMethod
                    user {
                      name
                      phone
                    }
                  }
                }
                `,
                variables: credentials
              }),
            providesTags: ['Order'],
        }),
    }),
});

export const { useUpdateOrderMutation, useGetOrderProcessingQuery, useGetOrderHistoryQuery, useGetOrderByIDQuery } = orderApi;