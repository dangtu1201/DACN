import { gql } from 'apollo-server-express';
// import { merge } from 'lodash';\
import pkg from 'lodash';
const { merge } = pkg;
import global from '../global/resolvers/index.js';
import {loginResolvers} from './login.resolver.js';
import {userResolvers} from './user.resolver.js';
import {imgResolvers} from './image.resolver.js';
import {productResolvers} from './product.resolver.js';
import {paymentResolvers} from './payment.resolver.js';
import {shopResolvers} from './shop.resolver.js';

// export const resolvers = [
//     loginResolvers,
//     userResolvers,
//     imgResolvers,
//     productResolvers,
//     paymentResolvers
// ];

export const resolvers = merge(loginResolvers, userResolvers, imgResolvers, productResolvers, paymentResolvers, shopResolvers, global);
