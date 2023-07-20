import {Product} from '../../model/productModel.js';
import {Shop} from '../../model/shopModel.js';
import {User} from '../../model/userModel.js';
import moment from 'moment-timezone';
import {generateToken, updateRefreshToken, decodeToken} from '../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../model/auth_var/jwt.js';
import { ObjectId } from 'mongodb';

const getUnshared = (arr1, arr2) => {
  return arr2.filter(x => !arr1.includes(x));
}

const getShared = (arr1, arr2) => {
  return arr2.filter(x => arr1.includes(x));
}

export const productResolvers = {
  Query: {
    getAllProducts: async () => {
      return await Product.find({}).populate('shop');
    },            
    getProducts: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      const checkShop = await Shop.findOne({shopOwner: ID});

      if(!checkShop) throw Error(`You are not a shop owner!`);
      if (!ID) throw Error(`Please login! <Received ID: ${ID} >`);

      const rs = await Product.find({userID: ObjectId(ID)}).populate('shop');
      const shop = await Shop.findOne({shopOwner: ObjectId(ID)});

      console.log("Result: ", rs)
      return rs;
    },
    getProductsByShop: async (_, {shopID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      
      if (!ID) throw Error(`Please login! <Received ID: ${ID} >`);

      console.log(shopID)

      const rs = await Product.find({'shop._id': ObjectId(shopID)}).populate('shop');

      console.log("Result: ", rs)
      return rs;
    },
    getProductsById: async (_, {productID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      
      if (!ID) throw Error(`Please login! <Received ID: ${ID} >`);

      console.log(productID)

      const rs = await Product.findById(productID).populate('shop');

      console.log("Result: ", rs)
      return rs;
    },
  },
  Mutation: {
    createProduct: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      const shopID = await Shop.findOne({shopOwner: ID});

      if(!shopID) throw Error(`You are not a shop owner!`);
      if (!ID) throw Error(`Please login! <Received ID: ${ID} >`);
      Object.assign(input, {shop: shopID._id});

      const image = ObjectId(input.image)
      const discount_id = (input.discount_id) ? (input.discount_id).map(ObjectId) : [];
      input.discount_id = discount_id;
      input.image = image;

      console.log("New product:", input);
      const rs = await Product.create(input);
      return rs;
    },
    updateProduct: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      // const ID = decoded.payload.userID;
      const ID = input._id;

      const rs = await Product.findByIdAndUpdate(ID, input, {new: true})
      return rs;
    },
    deleteProduct: async (_, {ID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;

      if (!userID) throw Error('This is not your product! ', ID) 
      
      const rs = await Product.findByIdAndRemove(ID);

      console.log(`Deleted product with name: ${rs.name} and description: ${rs.description} of user ${rs.userID}`)
      return rs;
    },
    // shareProduct: async (_, {input}, context) => {
    //   const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
    //   const userID = decoded.payload.userID;

    //   if (!userID) throw Error('Please login!', userID);

    //   //console.log("HERE: ", input, " ", userID)
    //   const check = await Shared.findOne({productID: input.productID, userID: userID, sharedUserID: {$in: input.sharedUserID}});

    //   if (check) {
    //     const temp = await Shared.findOne({productID: input.productID, userID: userID});    

    //     const arr1 = temp.sharedUserID;
    //     const arr2 = input.sharedUserID;

    //     const shared = await getShared(arr1, arr2);
        
    //     console.log(`You have already share this product to user(s): ${shared}`);
    //     throw Error(`You have already share this product to user(s): ${shared}`);
    //   }
      
    //   Object.assign(input, {userID: userID});
    //   //{$push: {sharedUserID: {$each: input.sharedUserID}}}
    //   const rs = await Shared.findOneAndUpdate({productID: input.productID}, {nodeID: input.productID, userID: userID, $push: {sharedUserID: {$each: input.sharedUserID}}}, {upsert: true, new: true});

    //   console.log(`Shared product ${rs.productID} with user(s): ${input.sharedUserID}`)

    //   return rs;
    // },
    // unshareProduct: async (_, {input}, context) => {
    //   const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
    //   const userID = decoded.payload.userID;

    //   if (!userID) throw Error('Please login!', userID);

    //   console.log("Here: ", input)
    //   const check = await Shared.findOne({productID: input.ID, userID: userID, sharedUserID: {$in: input.sharedUserID}});

    //   if (!check) {
    //     const temp = await Shared.findById(input.ID);    
    //     console.log(temp)

    //     const arr1 = temp.sharedUserID;
    //     const arr2 = input.sharedUserID;

    //     const unshared = getUnshared(arr1, arr2);

    //     throw Error(`You haven\'t share this product to user(s): ${unshared}`);
    //   }
      
    //   Object.assign(input, {userID: userID});
      
    //   const rs = await Shared.findOneAndUpdate({productID: input.ID, userID: input.userID}, 
    //     {$pull: {sharedUserID: {$in: input.sharedUserID}}}, 
    //     {upsert: false, new: true});

    //   console.log(`Remove user(s) ${input.sharedUserID} from product ${input.ID} sharing list`);

    //   if (rs.sharedUserID.length === 0){ 
    //     await Shared.findByIdAndRemove(rs._id); 
    //     console.log(`Delete empty shared product ${rs._id}`)
    //   }

    //   return rs;
    // },
  }
}