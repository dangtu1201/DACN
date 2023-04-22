import { gql } from 'apollo-server-express';
import {loginResolvers} from './login.resolver.js';
import {userResolvers} from './user.resolver.js';
import {imgResolvers} from './image.resolver.js';

export const resolvers = [
    loginResolvers,
    userResolvers,
    imgResolvers
];
