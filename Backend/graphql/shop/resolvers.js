import Shop from '../../models/shopModel.js';
import {generateToken, updateRefreshToken, decodeToken} from '../../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../models/auth_var/jwt.js';
import {registerValidator, editUserValidator} from '../../validation/validation.js';
import ObjectId from 'mongodb';

export const shopResolvers = {
  Query: {
    getAllShops: async () => {
      return await Shop.find({}).populate('shopOwner','customer','products');
    },            
    getShop: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const shop = await Shop.findOne({shopOwner: ID}).populate(['shopOwner', {path: 'customer'}, {path: 'products'}]);
      
      return shop;
    },
    getShopById: async (_, {shopId}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const shop = await Shop.findById(shopId).populate(['shopOwner', {path: 'customer'}, {path: 'products'}]);
      
      return shop;
    },
  },
  Mutation: {
    createShop: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      console.log("New shop:", input);
      const rs = await Shop.create(input);
      return rs;
    },
    updateShop: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      // const ID = decoded.payload.userID;
      const ID = input._id;

      const rs = await Product.findByIdAndUpdate(ID, input, {new: true})
      return rs;
    },
    deleteShop: async (_, {ID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;

      if (!userID) throw Error('This is not your shop! ', ID) 
      
      const rs = await Shop.findByIdAndRemove(ID);

      console.log(`Deleted product with name: ${rs.name} and description: ${rs.description} of user ${rs.userID}`)
      return rs;
    },
  }
}

const shop = [shopResolvers];

export default shop;