import pkg from 'lodash';
const {merge} = pkg;
import global from './global/resolvers/index.js';
import cart from './cart/resolvers.js';
import image from './image/resolvers.js';
import login from './login/resolvers.js';
import payment from './payment/resolvers.js';
import product from './product/resolvers.js';
import shop from './shop/resolvers.js';
import user from './user/resolvers.js';

const resolvers = merge(cart, image, login, payment, product, shop, global, user);
// resolvers = merge(comment, global)

export default resolvers;
