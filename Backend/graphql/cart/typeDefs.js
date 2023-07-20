import { gql } from 'apollo-server-express';
import { graphql } from 'graphql';

const typeDefs = gql`
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

  extend type Query {
    getAllCarts: [Cart!]

    getCart: [Cart]
  }

  extend type Mutation {
    createCart(input: createCart): Cart!

    updateCart(input: updateCart): Cart!

    deleteCart(ID: ID!): Cart
  }
`;

export default typeDefs;