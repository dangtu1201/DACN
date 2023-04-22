import {User} from '../../model/userModel.js'
import {Login} from '../../model/loginModel.js'
import {generateToken, updateRefreshToken, decodeToken} from '../middlewares/verifyToken.js'
import {loginValidator} from '../validation/validate.js'

import jwt from 'jsonwebtoken';
import { promisify } from 'util';
const sign = promisify(jwt.sign).bind(jwt);
import jwtVariable from '../../model/auth_var/jwt.js';

import moment from 'moment-timezone'

export const loginResolvers = {
    Query: {
      getAllLogins: async () => {
        return await Login.find({});
      },            
      getLogin: async (_, { ID }) => {
        return await Login.findById(ID);
      },
    },
    Mutation: {
      Login: async (_, { input }, { res }) => {
        // const randomId = Math.random().toString().split('.')[1];
        // const newUser = { ...args, _id: randomId }
        if (!input.username && !input.email)
          throw Error("Please enter username/email !");

        const {error} = loginValidator(input);
        if (error) throw Error(error.details[0].message);

        let user = await User.findOne({username: input.username});
        //console.log("username: ", user)
        if (!user) user = await User.findOne({email: input.username});
        //console.log("email: ", user)

        if (!user) throw Error('Username/Email not exist!');

        if (user.password !== input.password) throw Error('Wrong password!');

        const accessToken = await generateToken(
          { userID: user._id }, 
          process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret,  
          process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife
        )

        const refreshToken = await generateToken(
          { userID: user._id }, 
          jwtVariable.refreshTokenSecret, 
          jwtVariable.refreshTokenLife
        )

        res.cookie('access-token', accessToken, {expire: new Date() + 9});
        res.cookie('refresh-token', refreshToken, {expire: new Date() + 9});

        let loginInfo = {}

        // const decoded = await decodeToken(refreshToken, jwtVariable.refreshTokenSecret);
        // console.log("Token", decoded.payload.userID)

        const loginAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
        Object.assign(loginInfo, {userID: user._id, loginAt: loginAt, refreshToken: refreshToken, $unset: { logoutAt: "" }});
        
        const rs = await Login.findOneAndUpdate({userID: loginInfo.userID}, loginInfo, {upsert: true, new: true});

        console.log(`Welcome user ${rs.userID}`);
        return rs;
      },
      Logout: async (_, args, context) => {
        // const randomId = Math.random().toString().split('.')[1];
        // const newUser = { ...args, _id: randomId }

        const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
        const ID = decoded.payload.userID;

        let loginInfo = {}

        const logoutAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate();
        Object.assign(loginInfo, {userID: ID, logoutAt: logoutAt, $unset: { refreshToken: "" }});
        
        const rs = await Login.findOneAndUpdate({userID: ID}, loginInfo, {upsert: true, new: true});
        console.log(`User ${ID} logged out`);
        return rs;
      },
    }
  }