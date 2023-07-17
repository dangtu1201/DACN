import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase'

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: customFetchBase,
    tagTypes: ['Shop'],
    endpoints: (builder) => ({
        getShopById: builder.query({
            query: (credentials) => ({
                document: `query GetShopById($shopId: ID) {
                    getShopById(shopId: $shopId) {
                      _id
                      coordinates {
                        lat
                        long
                      }
                      shopName
                      address
                      status
                    }
                }`,
                variables: credentials,
            }),
        }),
    }),
})

export const { useGetShopByIdQuery } = shopApi