import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: customFetchBase,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                document: `query GetProducts {
                    getProducts {
                      _id
                      price_old
                      name
                      description
                      quantity
                      price
                      activeTime {
                        from
                        to
                      }
                      status
                      image
                      shop {
                        coordinates {
                          lat
                          long
                        }
                        _id
                        shopName
                        address
                        status
                      }
                    }
                  }`,
            }),
        }),
        getProductById: builder.query({
            query: (credentials) => ({
                document: `query GetProductsById($productId: ID!) {
                  getProductsById(productID: $productId) {
                    _id
                    name
                    description
                    quantity
                    price_old
                    price
                    activeTime {
                      from
                      to
                    }
                    status
                    image
                    shop {
                      _id
                      coordinates {
                        lat
                        long
                      }
                      shopName
                      address
                      status
                    }
                  }
                }`,
                variables: credentials,
          }),
        }),
        getProductByShopId: builder.query({
          query: (credentials) => ({
              document: `query GetProductsByShop($shopId: ID!) {
                getProductsByShop(shopID: $shopId) {
                  _id
                  name
                  price_old
                  price
                  activeTime {
                    from
                    to
                  }
                  image
                }
              }`,
              variables: credentials,
          }),
        }),
    }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductByShopIdQuery } = productApi;