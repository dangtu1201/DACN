import { ExtractJwt } from 'passport-jwt';
import { rule } from "graphql-shield";
import {verifyToken, generateToken, updateRefreshToken, decodeToken} from '../middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
import jwtVariable from '../models/auth_var/jwt.js';


export const isAuthorized = rule()(async (parent, args, context, info) => {
    const Authorization = context.token;
    if (!Authorization) {
      return false;
    }
  
    const token = Authorization.replace("Bearer", "").trim();
  
    const userID = jwt.verify(token, jwtVariable.refreshTokenSecret);

    return !!userID;
  });

export default class Auth {
    constructor({ req, res }) {
        this.req = req;
        this.res = res;
        this.isReady = false;
        this.accessTokenName = 'ip_at';
    }

    async authenticate() {
        const { req } = this;

        if (req.sdkUser) {
            this.payload = req.sdkUser;
        } else {
            if (!req.headers.authorization) {
                const cookie = req.cookies[this.accessTokenName];
                if (cookie) {
                    req.headers.authorization = `bearer ${cookie}`;
                }
            }
            // The token is very likely to be in cookies

            // We can call to another service to verify token here
            try {
                const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
                if (token) {
                    const user = await tnccAuthSdk.verifyToken(token);
                    if (user) {
                        const { id: authUserId } = user;
                        this.payload = {
                            uid: authUserId,
                            isAuthUser: true,
                            resource: user.userType,
                            user,
                        };
                    }
                }
            } catch (e) {
                console.log(e);
                // Ignore error
            }
        }
    }

    isSdkUser() {
        return this.payload?.isSdk;
    }

    getSdkUser() {
        return mongooseUtils.SdkUserModel.findOne({ id: this.getUserId() });
    }

    isAuthUser() {
        return this.payload?.isAuthUser;
    }

    getUserId() {
        return this.payload?.uid;
    }

    getResourceName() {
        return this.payload?.resource;
    }

    getUser() {
        return this.payload?.user;
    }
}
