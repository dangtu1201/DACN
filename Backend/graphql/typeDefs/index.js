import { gql } from 'apollo-server-express';
import {loginTypeDefs} from './login.typeDefs.js';
import {userTypeDefs} from './user.typeDefs.js';
import {imgTypeDefs} from './image.typeDefs.js';


export const typeDefs = [
    loginTypeDefs,
    userTypeDefs,
    imgTypeDefs
]