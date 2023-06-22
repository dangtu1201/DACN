import { gql } from 'apollo-server-express';
import {Shop} from '../../model/shopModel.js';
import { graphql } from 'graphql';

export const shopTypeDefs = gql`
  scalar DateTime

  type Roles {
    User: Int
    Admin: Int
  }

  input _Roles {
    User: Int
    Admin: Int
  }

  input createUser{
    email: String!
    password: String!
    firstname: String
    surname: String
    image: String
    roles: _Roles
  }

  input updateUser{
    email: String
    password: String
    firstname: String
    surname: String
    image: String
    favoriteShop: [ID]
    paymentHistory: [ID]
    roles: _Roles
  }
  
  type User {
    _id: ID!
    email: String
    password: String
    createAt: DateTime
    updateAt: DateTime
    favoriteShop: [ID]
    paymentHistory: [ID]
    roles: Roles
    firstname: String
    surname: String
    image: String
  }

  type Query {
    users: [User!]!
    getAllUsers: [User!]!
    getUser: User!
  }

  type Mutation {
    createUser(input: createUser): User!

    updateUser(input: updateUser): User

    deleteUser: User
  }
`;