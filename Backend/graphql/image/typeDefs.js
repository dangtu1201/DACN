import { gql } from 'apollo-server-express';
import User from '../../models/userModel.js';
import { graphql   } from 'graphql';

const typeDefs = gql`
  input url {
    url: String!
  }

  type Url {
    url: String!
  }

  type File {
    _id: ID!
    filename: String
    filepath: String
    mimetype: String
    encoding: String
    url: String
  }

  extend type Query {
    getProductImg: String
    getUserImg: Url
  }

  extend type Mutation {
    singleUpload(input: url): File
  }
`;

export default typeDefs;