import Product from '../../models/productModel.js';
import Cart from '../../models/CartModel.js';
import User from '../../models/userModel.js';
import moment from 'moment-timezone';
import {generateToken, updateRefreshToken, decodeToken} from '../../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../models/auth_var/jwt.js';
import pkg from 'mongodb';
const {ObjectId} = pkg;

export const cartResolvers = {
  Query: {
    getAllCarts: async () => {
      return await Cart.find({});
    },            
    getCart: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      return await Cart.find({userID: ObjectId(ID)});
    },
  },
  Mutation: {
    createCart: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      Object.assign(input, {userID: ID});
      
      console.log("New cart:", input);
      const rs = await Cart.create(input);
      return rs;
    },
    updateCart: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      Object.assign(input, {userID: ID});

      const rs = await Cart.findOneAndUpdate({userID: ID}, input, {new: true})
      return rs;
    },
    deleteCart: async (_, {ID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;

      if (!userID) throw Error('This is not your cart! ', ID) 
      
      const rs = await Cart.findByIdAndRemove(ID);

      console.log(`Deleted cart with name: ${rs.name} and description: ${rs.description} of user ${rs.userID}`)
      return rs;
    },
  }
}

const cart = [cartResolvers];

export default cart;