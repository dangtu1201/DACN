import { gql } from 'apollo-server-express';
import {User} from '../../model/userModel.js';
import { graphql   } from 'graphql';

export const imgTypeDefs = gql`
  scalar Upload

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

  type Query {
    getUserImg: Url
  }

  type Query {
    getProductImg: String
  }

  type Mutation {
    singleUpload(input: url): File
  }
`;