import { gql } from 'apollo-server-express';
import {Shop} from '../../model/shopModel.js';
import { graphql } from 'graphql';

export const shopTypeDefs = gql`
  scalar DateTime

  enum status {
    Approved
    Unapproved
    Active
    Inactive
  }

  type Coordinates {
    lat: String
    long: String
  }

  input _Coordinates {
    lat: String
    long: String
  }

  input createShop{
    shopName: String
    address: String
    coordinates: _Coordinates
    paymentMethod: [ID]
    shopOwner: ID
    customer: [ID]
    products: [ID]
    status: status
  }

  input updateShop{
    shopName: String
    address: String
    coordinates: _Coordinates
    paymentMethod: [ID]
    shopOwner: ID
    customer: [ID]
    products: [ID]
    status: status
  }
  
  type Shop {
    _id: ID!
    shopName: String
    address: String
    createAt: DateTime
    updateAt: DateTime
    coordinates: Coordinates
    paymentMethod: [ID]
    shopOwner: User
    customer: [User]
    products: [Product]
    status: status
  }

  type Query {
    getAllShops: [Shop]!
    getShop: Shop
    getShopById(shopId: ID): Shop
  }

  type Mutation {
    createShop(input: createShop): Shop!

    updateShop(input: updateShop): Shop!

    deleteShop(ID: ID!): Shop
  }
`;