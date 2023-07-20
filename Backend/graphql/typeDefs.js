import global from './global/typeDefs/index.js';
import cart from './cart/typeDefs.js';
import image from './image/typeDefs.js';
import login from './login/typeDefs.js';
import payment from './payment/typeDefs.js';
import product from './product/typeDefs.js';
import shop from './shop/typeDefs.js';
import user from './user/typeDefs.js';

const typeDefs = [...global, cart, image, login, payment, product, shop, user];

export default typeDefs;
