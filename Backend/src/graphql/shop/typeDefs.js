import { gql } from 'apollo-server-express';
import Shop from '../../models/shopModel.js';
import { graphql } from 'graphql';

const typeDefs = gql`
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
    CID: String
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
    CID: String
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
    CID: String
    rating: Float
    rating_list: [Int]
  }

  extend type Query {
    getAllShops: [Shop]!
    getShop: Shop
    getShopById(shopId: ID): Shop
  }

  extend type Mutation {
    createShop(input: createShop): Shop!

    updateShop(input: updateShop): Shop!

    deleteShop(ID: ID!): Shop
  }
`;

export default typeDefs