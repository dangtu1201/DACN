import { gql } from 'apollo-server-express';
import Product from '../../models/productModel.js';
import { graphql } from 'graphql';

const typeDefs = gql`
  enum Status {
    Active
    Inactive
  }

  type Coordinates {
    lat: String
    long: String
  }

  type activeTime {
    from: String
    to: String
  }

  input _activeTime {
    from: String
    to: String
  }

  input createProduct{
    name: String
    description: String
    quantity: Int
    price_old: Float
    price: Float
    discount_id: [ID]
    category: [String]
    activeTime: _activeTime
    status: Status
    image: String
  }

  input updateProduct{
    _id: ID
    name: String
    description: String
    quantity: Int
    price_old: Float
    price: Float
    discount_id: [ID]
    category: [String]
    activeTime: _activeTime
    status: Status
    image: String
  }

  input Product_ {
    _id: ID
    name: String
    description: String
    quantity: Int
    price_old: Float
    price: Float
    discount_id: [ID]
    category: [String]
    activeTime: _activeTime
    status: Status
    image: String
  }

  type Product {
    _id: ID!
    name: String
    description: String
    quantity: Int
    price_old: Float
    price: Float
    discount_id: [ID]
    shop: Shop
    category: [String]
    createAt: DateTime
    updateAt: DateTime
    activeTime: activeTime
    status: Status
    image: String
    rating: Float
    rating_list: [Int]
  }

  extend type Query {
    getAllProducts(input: Product_): [Product]

    getProducts(input: Product_): [Product]

    getProductsByShop(shopID: ID!): [Product]

    getProductsById(productID: ID!): Product
  }

  extend type Mutation {
    createProduct(input: createProduct): Product!

    updateProduct(input: updateProduct): Product!

    deleteProduct(ID: ID!): Product
  }
`;

export default typeDefs