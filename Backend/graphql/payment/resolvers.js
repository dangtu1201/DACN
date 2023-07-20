import Product from '../../models/productModel.js';
import Payment from '../../models/paymentModel.js';
import User from '../../models/userModel.js';
import Shop from '../../models/shopModel.js';
import moment from 'moment-timezone';
import {generateToken, updateRefreshToken, decodeToken} from '../../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../models/auth_var/jwt.js';
import ObjectId from 'mongodb';

export const paymentResolvers = {
  Query: {
    getAllPayments: async () => {
      return await Payment.find({}).populate(['user', 'shop',{path: 'products', populate: {path: 'product', model: 'Product'}}]);
    },            
    getPayments: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;
      if(input) Object.assign(input, {user: ObjectId(userID)});
      
      const rs = await Payment.find(input).populate(['user', 'shop',{path: 'products', populate: {path: 'product', model: 'Product'}}]);
      console.log(rs);

      return rs;
    },
    getPaymentsShop: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;
      const shopID = await Shop.findOne({shopOwner: userID});

      if(!shopID) throw Error(`You are not a shop owner!`);
      if(input) Object.assign(input, {shop: ObjectId(shopID._id)});
      
      const rs = await Payment.find(input).populate(['user', 'shop',{path: 'products', populate: {path: 'product', model: 'Product'}}]);
      console.log(rs);

      return rs;
    },
    getPaymentById: async (_, {ID}, context) => {
      return await Payment.findById(ObjectId(ID));
    },
  },
  Mutation: {
    createPayment: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      // input.products = input.products.map(item => {
      //   item.product = ObjectId(item.product);
      //   return item;
      // })

      // Object.assign(input, {user: ID});
      
      console.log("New payment:", input);
      const rs = await Payment.create(input);
      return rs;
    },
    updatePayment: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await Payment.findOneAndUpdate({user: ID}, input, {new: true})
      return rs;
    },
    deletePayment: async (_, {ID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;

      if (!userID) throw Error('This is not your payment! ', ID) 
      
      const rs = await Payment.findByIdAndRemove(ID);

      console.log(`Deleted payment with name: ${rs.name} and description: ${rs.description} of user ${rs.userID}`)
      return rs;
    },
  }
}

const payment = [paymentResolvers];

export default payment;