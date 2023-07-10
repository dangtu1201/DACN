import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: customFetchBase,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (credentials) => ({
                document: `query GetProductsByShop($shopId: ID!) {
                  getProductsByShop(shopID: $shopId) {
                    _id
                    name
                    description
                    quantity
                    price_old
                    price
                    category
                    activeTime {
                      from
                      to
                    }
                    status
                    image
                  }
                }`,
              variables: credentials,
            }),
        }),
        addProduct: builder.mutation({
            query: (credentials) => ({
                document: `mutation Mutation($input: createProduct) {
                  createProduct(input: $input) {
                    name
                    description
                    quantity
                  }
                }`,
              variables: credentials,
            }),
          }),
    }),
});

export const { useGetProductsQuery, useAddProductMutation } = productApi;