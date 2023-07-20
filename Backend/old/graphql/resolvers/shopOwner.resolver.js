import {Shop} from '../../model/shopModel.js';
import {generateToken, updateRefreshToken, decodeToken} from '../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../model/auth_var/jwt.js';
import {registerValidator, editUserValidator} from '../validation/validate.js';

export const userResolvers = {
  Query: {
    users: async (_, args) => {
      return await Shop.find({});
    },
    getAllUsers: async () => {
      return await Shop.find({});
    },            
    getUser: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const user = await Shop.findById(ID);
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

      const checkPhone = await Shop.findOne({phone: input.phone});
      const checkEmail = await Shop.findOne({email: input.email});

      //console.log(`${checkPhone} + ${checkEmail}`)
      
      if (checkPhone) throw Error("Phone already existed!");
      if (checkEmail) throw Error("Email already used!");

      console.log("New shop owner:", input);
      const rs = await Shop.create(input);
      return rs;
    },
    updateUser: async (_, {input}, context) => {

      // const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
      // Object.assign(newUser, {updateAt: date});
      const {error} = editUserValidator(input);
      if (error) throw Error(error.details[0].message);

      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      
      const user = await Shop.findById(ID);

      //console.log("Data: ", input)
      
      if (input.phone && input.phone === user.phone)
        if (input.email && input.email === user.email)
          if (input.password && input.password === user.password)
            if ((input.firstname && input.firstname === user.firstname) || !input.firstname)
              if ((input.surname && input.surname === user.surname) || !input.surname)
                if ((input.image && input.image === user.image) || !input.image){
                  console.log("Nothing changed!");
                  throw Error("Nothing changed!")
                }

      const rs = await Shop.findByIdAndUpdate(ID, input, {new: true})
      console.log("Update result: ", rs);
      return rs;
    },
    deleteUser: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await Shop.findByIdAndRemove(ID);

      console.log("Deleted shop owner: ", rs)
      return rs;
    },
  }
}