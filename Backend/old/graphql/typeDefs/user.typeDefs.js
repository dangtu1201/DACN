import { gql } from 'apollo-server-express';
import {User} from '../../model/userModel.js';
import { graphql } from 'graphql';

export const userTypeDefs = gql`
  scalar DateTime

  enum Roles {
    User
    Admin
  }

  input createUser{
    phone: String
    email: String!
    password: String!
    name: String
    image: String
    roles: Roles
  }

  input updateUser{
    email: String
    password: String
    name: String
    image: String
    favoriteShop: [ID]
    paymentHistory: [ID]
    roles: Roles
  }
  
  type User {
    _id: ID!
    email: String
    phone: String
    password: String
    createAt: DateTime
    updateAt: DateTime
    favoriteShop: [ID]
    paymentHistory: [ID]
    roles: Roles
    name: String
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