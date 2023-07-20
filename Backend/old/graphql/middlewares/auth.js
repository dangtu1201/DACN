import { rule } from "graphql-shield";
import {verifyToken, generateToken, updateRefreshToken, decodeToken} from '../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../../model/auth_var/jwt.js';

export const isAuthorized = rule()(async (parent, args, context, info) => {
    const Authorization = context.token;
    if (!Authorization) {
      return false;
    }
  
    const token = Authorization.replace("Bearer", "").trim();
  
    const userID = jwt.verify(token, jwtVariable.refreshTokenSecret);

    return !!userID;
  });