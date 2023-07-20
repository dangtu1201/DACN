import { gql } from 'apollo-server-express';
import {Cart} from '../../model/cartModel.js';
import { graphql } from 'graphql';

export const paymentTypeDefs = gql`
  scalar DateTime

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
    status: String
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
  }

  type Query {
    getAllPayments: [Payment!]

    getPayments(input: Payment_): [Payment]

    getPaymentsShop(input: Payment_): [Payment]

    getPaymentById(ID: ID): Payment
  }

  type Mutation {
    createPayment(input: createPayment): Payment!

    updatePayment(input: updatePayment): Payment!

    deletePayment(ID: ID!): Payment
  }
`;