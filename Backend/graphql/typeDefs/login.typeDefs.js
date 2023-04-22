import { gql } from 'apollo-server-express';
import {Login} from '../../model/loginModel.js';



export const loginTypeDefs = gql`
  scalar DateTime

  input loginInput {
    username: String
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
    getLogin(_username: String!): Login
  }

  type Mutation {
    Login(input: loginInput): Login
    Logout: Login
  }
`;