import { gql } from 'apollo-server-express';
import {Login} from '../../model/loginModel.js';



export const loginTypeDefs = gql`
  scalar DateTime

  input loginInput {
    phone: String
    email: String
    password: String!
  }

  type Login {
    userID: ID
    loginAt: DateTime
    logoutAt: DateTime
    refreshToken: String
  }

  type Query {
    getAllLogins: [Login!]
    getAllShopLogins: [Login!]
    getLogin(_phone: String!): Login
    getShopLogin(_phone: String!): Login
  }

  type Mutation {
    Login(input: loginInput): Login
    Logout: Login
    LoginShop(input: loginInput): Login
    LogoutShop: Login
  }
`;