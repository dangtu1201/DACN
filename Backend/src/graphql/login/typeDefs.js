import { gql } from 'apollo-server-express';

const typeDefs = gql`
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

  extend type Query {
    getAllLogins: [Login!]
    getLogin(_phone: String!): Login
  }

  extend type Mutation {
    Login(input: loginInput): Login
    Logout: Login
  }
`;

export default typeDefs