import {ShopOwner} from '../../model/shopOwnerModel.js';
import {generateToken, updateRefreshToken, decodeToken} from '../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../model/auth_var/jwt.js';
import {registerValidator, editUserValidator} from '../validation/validate.js';

export const userResolvers = {
  Query: {
    users: async (_, args) => {
      return await ShopOwner.find({});
    },
    getAllUsers: async () => {
      return await ShopOwner.find({});
    },            
    getUser: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const user = await ShopOwner.findById(ID);
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

      const checkUsername = await ShopOwner.findOne({username: input.username});
      const checkEmail = await ShopOwner.findOne({email: input.email});

      //console.log(`${checkUsername} + ${checkEmail}`)
      
      if (checkUsername) throw Error("Username already existed!");
      if (checkEmail) throw Error("Email already used!");

      console.log("New shop owner:", input);
      const rs = await ShopOwner.create(input);
      return rs;
    },
    updateUser: async (_, {input}, context) => {

      // const date = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
      // Object.assign(newUser, {updateAt: date});
      const {error} = editUserValidator(input);
      if (error) throw Error(error.details[0].message);

      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      
      const user = await ShopOwner.findById(ID);

      //console.log("Data: ", input)
      
      if (input.username && input.username === user.username)
        if (input.email && input.email === user.email)
          if (input.password && input.password === user.password)
            if ((input.firstname && input.firstname === user.firstname) || !input.firstname)
              if ((input.surname && input.surname === user.surname) || !input.surname)
                if ((input.image && input.image === user.image) || !input.image){
                  console.log("Nothing changed!");
                  throw Error("Nothing changed!")
                }

      const rs = await ShopOwner.findByIdAndUpdate(ID, input, {new: true})
      console.log("Update result: ", rs);
      return rs;
    },
    deleteUser: async (_, args, context) => {
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;

      const rs = await ShopOwner.findByIdAndRemove(ID);

      console.log("Deleted shop owner: ", rs)
      return rs;
    },
  }
}