import { gql } from 'apollo-server-express';
import {Cart} from '../../model/cartModel.js';
import { graphql } from 'graphql';

export const cartTypeDefs = gql`
  scalar DateTime

  type product {
    product: ID
    quantity: Int
  }

  input product_ {
    product: ID
    quantity: Int
  }

  input createCart{
    userID: ID
    product: [product_]
  }

  input updateCart{
    userID: ID
    product: [product_]
  }

  type Cart {
    _id: ID!
    userID: ID
    product: [product]
    createAt: DateTime
    updateAt: DateTime
  }

  type Query {
    getAllCarts: [Cart!]

    getCart: [Cart]
  }

  type Mutation {
    createCart(input: createCart): Cart!

    updateCart(input: updateCart): Cart!

    deleteCart(ID: ID!): Cart
  }
`;