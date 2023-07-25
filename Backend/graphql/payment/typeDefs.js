import { gql } from 'apollo-server-express';
import { graphql } from 'graphql';

const typeDefs = gql`
  union IntOrString = IntBox | StringBox

  type IntBox {
    IntBox: Int
  }
  
  type StringBox {
    StringBox: String
  }

  type product {
    product: Product
    quantity: Int
  }

  input product_ {
    product: ID
    quantity: Int
  }

  enum paymentMethod {
    MOMO
    ZALOPAY
    CASH
  }

  enum Status {
    DONE
    CANCEL
    PROCESSING
  }

  input createPayment{
    products: [product_]
    user: ID
    shop: ID
    subtotal: Float
    discount: Float
    coupon: Float
    total: Float
    paymentMethod: paymentMethod
    status: String
  }

  input updatePayment{
    products: [product_]
    user: ID
    shop: ID
    subtotal: Float
    discount: Float
    coupon: Float
    total: Float
    paymentMethod: paymentMethod
    status: String
  }

  input Payment_ {
    _id: ID 
    products: [product_]
    user: ID
    shop: ID
    subtotal: Float
    discount: Float
    coupon: Float
    total: Float
    paymentMethod: paymentMethod
    status: [String]
  }

  type Payment {
    _id: ID 
    products: [product]
    user: User
    shop: Shop
    subtotal: Float
    discount: Float
    coupon: Float
    total: Float
    paymentMethod: paymentMethod
    status: String
    createAt: DateTime
    updateAt: DateTime
    isReviewed: Boolean
  }

  extend type Query {
    getAllPayments: [Payment!]

    getPayments(input: Payment_): [Payment]

    getPaymentsShop(input: Payment_): [Payment]

    getPaymentById(ID: ID): Payment
  }

  extend type Mutation {
    createPayment(input: createPayment): Payment!

    updatePayment(ID: ID!, input: updatePayment): Payment!

    deletePayment(ID: ID!): Payment
  }
`;

export default typeDefs