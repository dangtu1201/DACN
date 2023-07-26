import { gql } from 'apollo-server-express';
import User from '../../models/userModel.js';
import { graphql   } from 'graphql';

const typeDefs = gql`
  input url {
    url: String
  }

  type Url {
    url: String
  }

  type File {
    _id: ID!
    url: String
  }

  extend type Query {
    getProductImg(productID: ID): Url
    getUserImg(userID: ID): Url
  }

  extend type Mutation {
    singleUpload(photo: String): String
  }
`;

export default typeDefs;