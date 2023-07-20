import { shield, allow, not } from "graphql-shield";

import { isAuthorized } from './auth.js'

export const permissions = shield({
  Query: {
    getAllUsers: (isAuthorized),
    getUser: (isAuthorized),
    users: (isAuthorized)
  },
  Mutation: {
    // addProduct: isAuthorized,
  },
},
{ debug: true }
);