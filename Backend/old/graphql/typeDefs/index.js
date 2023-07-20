import { gql } from 'apollo-server-express';
import global from '../global/typeDefs/index.js';
import {loginTypeDefs} from './login.typeDefs.js';
import {userTypeDefs} from './user.typeDefs.js';
import {imgTypeDefs} from './image.typeDefs.js';
import {productTypeDefs} from './product.typeDefs.js';
import {paymentTypeDefs} from './payment.typeDefs.js';
import {shopTypeDefs} from './shop.typeDefs.js';


// export const typeDefs = [
//     loginTypeDefs,
//     userTypeDefs,
//     imgTypeDefs,
//     productTypeDefs,
//     paymentTypeDefs
// ]

export const typeDefs = [...global, loginTypeDefs, userTypeDefs, imgTypeDefs, productTypeDefs, paymentTypeDefs, shopTypeDefs];

// export default typeDefs;