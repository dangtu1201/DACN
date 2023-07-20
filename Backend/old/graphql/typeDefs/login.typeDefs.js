import { gql } from 'apollo-server-express';
import {Login} from '../../model/loginModel.js';



export const loginTypeDefs = gql`
  scalar DateTime

  enum AS {
    User
    Shop
  }

  input loginInput {
    phone: String
    email: String
    password: String!
    as: AS
  }

  type Login {
    userID: ID
    loginAt: DateTime
    logoutAt: DateTime
    refreshToken: String
    as: AS
  }

  type Query {
    getAllLogins: [Login!]
    getLogin(_phone: String!): Login
  }

  type Mutation {
    Login(input: loginInput): Login
    Logout: Login
  }
`;