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
        filterShop: builder.query({
            query: (credentials) => ({
                document: `query GetNearbyShop($coordinates: _Coordinates, $rating: Int) {
                    getNearbyShop(Coordinates: $coordinates, rating: $rating) {
                      status
                      shopName
                      rating
                      coordinates {
                        lat
                        long
                      }
                      shopOwner {
                        image
                      }
                      _id
                    }
                  }`,
                variables: credentials,
            }),
        }),
    }),
})

export const { useGetShopByIdQuery, useFilterShopQuery } = shopApi