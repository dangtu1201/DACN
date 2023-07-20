import User from '../../models/userModel.js';
import {generateToken, updateRefreshToken, decodeToken} from '../../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../models/auth_var/jwt.js';
import {registerValidator, editUserValidator} from '../../validation/validation.js';

export const userResolvers = {
  Query: {
    users: async (_, args) => {
      return await User.find({});
    },
    getAllUsers: async () => {
      return await User.find({});
    },            
    getUser: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const user = await User.findById(ID);
      const tail = user.image;
      const head = 'http://res.cloudinary.com/dizogp0ro/image/upload/';
      const url = head.concat(tail);

      user.image = url;
      return user;
    },
  },
  Mutation: {
    createUser: async (_, {input},) => {
      const {error} = registerValidator(input);
      if (error) throw Error(error.details[0].message);

      const checkPhone = await User.findOne({phone: input.phone});
      const checkEmail = await User.findOne({email: input.email});

      //console.log(`${checkPhone} + ${checkEmail}`)
      
      if (checkPhone) throw Error("Phone already existed!");
      if (checkEmail) {
        console.log(checkEmail)
        throw Error("Email already used!");
      }

      

      console.log("New user:", input);
      const rs = await User.create(input);

      // console.log("Last ID: ". rs._id);
      // const cart = await Cart.create({userID: rs._id});

      return rs;
    },
    updateUser: async (_, {input}, context) => {

      // const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
      // Object.assign(newUser, {updateAt: date});
      const {error} = editUserValidator(input);
      if (error) throw Error(error.details[0].message);

      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      
      const user = await User.findById(ID);

      //console.log("Data: ", input)
      
      if (input.phone && input.phone === user.phone)
        if (input.email && input.email === user.email)
          if (input.password && input.password === user.password)
            if ((input.name && input.name === user.name) || !input.name)
              if ((input.image && input.image === user.image) || !input.image){
                console.log("Nothing changed!");
                throw Error("Nothing changed!")
              }

      const rs = await User.findByIdAndUpdate(ID, input, {new: true})
      console.log("Update result: ", rs);
      return rs;
    },
    deleteUser: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await User.findByIdAndRemove(ID);

      console.log("Deleted user: ", rs)
      return rs;
    },
  }
}

const user = [userResolvers];

export default user;