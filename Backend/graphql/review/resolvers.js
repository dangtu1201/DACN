import Product from '../../models/productModel.js';
import Shop from '../../models/shopModel.js';
import User from '../../models/userModel.js';
import Review from '../../models/reviewModel.js';
import moment from 'moment-timezone';
import {generateToken, updateRefreshToken, decodeToken} from '../../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../models/auth_var/jwt.js';
import pkg from 'mongodb';
import resolvers from '../global/resolvers/index.js';
const {ObjectId} = pkg;

export const reviewResolvers = {
  Query: {
    getReviewsAll: async () => {
      return await Review.find({});
    },            
    getReviewsProduct: async (_, {productID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await Review.find({product: productID});

      console.log("Result (getReviewsProduct): ", rs)
      return rs;
    },
    getReviewsShop: async (_, {shopID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await Shop.findById(shopID).then(async (shop) => {
        let id_list = shop.products.map(item => {
          return ObjectId(item);
        })
        // console.log(id_list);
        return await Review.find({product: {$in: id_list}});
      })

      console.log("Result (getReviewsShop): ", rs)
      return rs;
    },
    getReviewById: async (_, {reviewID}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await Review.findById(reviewID);

      console.log("Result (getReviewById): ", rs)
      return rs;
    },
  },
  Mutation: {
    createReview: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      if (!ID) throw Error(`Please login! <Received ID: ${ID} >`);
      Object.assign(input, {user: ObjectId(ID)});

      // await Shop.findOneAndUpdate({products: ObjectId(input.product)}, {rating: input.rating}, {new: true});
      await Product.findByIdAndUpdate(input.product, {$push: {rating_list: input.rating}}, {new: true})
      .then(async result => {
          const rating_list = result.rating_list;
          const average = rating_list.reduce((a, b) => a + b, 0) / rating_list.length;

          result.rating = average;
          result.save(function(err){

            console.log("Product Rating Updated");       
          });
      });

      await Shop.findOneAndUpdate({products: ObjectId(input.product)}, {$push: {rating_list: input.rating}}, {new: true})
      .then(async result => {
          const rating_list = result.rating_list;
          const average = rating_list.reduce((a, b) => a + b, 0) / rating_list.length;

          result.rating = average;
          result.save(function(err){

            console.log("Shop Rating Updated");       
          });
      });

      const rs = await Review.create(input);
      return rs;
    },
    updateReview: async (_, {input}, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;
      const ID = input._id;

      const new_rating = (input.rating) ? input.rating : 0;
      delete input.rating;

      const result = await Review.findByIdAndUpdate(ID, input, {new: true});
      if (userID != result.user) throw Error(`This is not your review <Your ID: ${userID} >`);
      else {
        const findProduct = await Product.findByIdAndUpdate(result.product, {$pull: {rating_list: result.rating}});
        const rating_list = findProduct.rating_list;

        rating_list.push(new_rating);

        const index = rating_list.indexOf(result.rating);
        if (index > -1) { // only splice array when item is found
          rating_list.splice(index, 1); // 2nd parameter means remove one item only
        }
        
        let average = 0;
        if (rating_list.length > 0) average = rating_list.reduce((a, b) => a + b, 0) / rating_list.length;
        findProduct.rating_list = rating_list;
        findProduct.rating = average;
        await findProduct.save((err, userDoc) => {
          if (err) return res.status(400).send(err);
          console.log('saved findProduct');
        });
        ////////////////////////////////////////////////////
        const findShop = await Shop.findOneAndUpdate({products: ObjectId(result.product)}, {$pull: {rating_list: result.rating}})
        const rating_list_ = findShop.rating_list;

        rating_list_.push(new_rating);

        const index_ = rating_list_.indexOf(result.rating);
        if (index_ > -1) { // only splice array when item is found
          rating_list_.splice(index_, 1); // 2nd parameter means remove one item only
        }
        
        let average_ = 0;
        if (rating_list_.length > 0) average_ = rating_list_.reduce((a, b) => a + b, 0) / rating_list_.length;
        findShop.rating_list = rating_list_;
        findShop.rating = average_;
        const test = await findShop.save((err, userDoc) => {
          if (err) return res.status(400).send(err);
          console.log('saved findShop');
        });
      }  

      
      Object.assign(result, {rating: new_rating})
      return await result.save();
    },
    deleteReview: async (_, {ID}, context) => {
      try {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const userID = decoded.payload.userID;

      if (!userID) throw Error(`Please login! <Received ID: ${userID} >`);
      
      const result = await Review.findByIdAndRemove(ID);
      if (userID != result.user) throw Error(`This is not your review <Your ID: ${userID} >`);
      else {
          const findProduct = await Product.findByIdAndUpdate(result.product, {$pull: {rating_list: result.rating}});
          const rating_list = findProduct.rating_list;

          const index = rating_list.indexOf(result.rating);
          if (index > -1) { // only splice array when item is found
            rating_list.splice(index, 1); // 2nd parameter means remove one item only
          }
          
          let average = 0;
          if (rating_list.length > 0) average = rating_list.reduce((a, b) => a + b, 0) / rating_list.length;
          findProduct.rating_list = rating_list;
          findProduct.rating = average;
          await findProduct.save((err, userDoc) => {
            if (err) return res.status(400).send(err);
            console.log('saved findProduct');
          });
          ////////////////////////////////////////////////////
          const findShop = await Shop.findOneAndUpdate({products: ObjectId(result.product)}, {$pull: {rating_list: result.rating}})
          const rating_list_ = findShop.rating_list;

          const index_ = rating_list_.indexOf(result.rating);
          if (index_ > -1) { // only splice array when item is found
            rating_list_.splice(index_, 1); // 2nd parameter means remove one item only
          }
          
          let average_ = 0;
          if (rating_list_.length > 0) average_ = rating_list_.reduce((a, b) => a + b, 0) / rating_list_.length;
          findShop.rating_list = rating_list_;
          findShop.rating = average_;
          const test = await findShop.save((err, userDoc) => {
            if (err) return res.status(400).send(err);
            console.log('saved findShop');
          });
        }   

      console.log(`Deleted review with id: ${result._id} of product ${result.product}`)
      return result;
    }
    catch(err){
      console.log(err);
    }
    },
  },
}

const review = [reviewResolvers];

export default review;