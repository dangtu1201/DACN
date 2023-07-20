import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const verifyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};

passport.use(
  'jwt',
  new Strategy(verifyOptions, (payload, done) => done(null, payload)),
);

export const createJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '30 days',
  });

export const authenticate = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', {}, (err, payload) => {
      if (err) {
        reject(err);
      }
      resolve(payload);
    })(req, res);
  });
