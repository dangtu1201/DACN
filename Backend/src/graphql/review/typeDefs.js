import { gql } from 'apollo-server-express';
import { graphql } from 'graphql';

const typeDefs = gql`
  input createReview{
    product: ID
    body: String
    rating: Int
    image: String
  }

  input createReviewPayment{
    body: String
    rating: Int
    image: String
  }

  input updateReview{
    _id: ID!
    body: String
    rating: Int
    image: String
  }

  type Review {
    _id: ID!
    product: ID
    user: ID
    body: String
    rating: Int
    image: String
    createAt: DateTime
    updateAt: DateTime
  }

  extend type Query {
    getReviewsAll: [Review]

    getReviewById(reviewID: ID): Review

    getReviewsProduct(productID: ID): [Review]

    getReviewsShop(shopID: ID): [Review]
  }

  extend type Mutation {
    createReview(input: createReview): Review!

    createReviewPayment(paymentID: ID, input: createReviewPayment): [Review!]

    updateReview(input: updateReview): Review

    deleteReview(ID: ID!): Review
  }
`;

export default typeDefs