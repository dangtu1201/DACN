import User from '../../models/userModel.js';
import Image from '../../models/imageModel.js';
import {generateToken, updateRefreshToken, decodeToken} from '../../middlewares/verifyToken.js';
import jwtVariable from '../../models/auth_var/jwt.js';
import mongoose from 'mongoose';
// @ts-ignore
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const conn = await mongoose.createConnection(
    'mongodb+srv://ddung:yjbcEXVQhI6qcmRr@dailygroceries.i9b1fll.mongodb.net/DailyGroceries?retryWrites=true&w=majority'
);

let gfs;

conn.once('open', () =>{
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

//Create storage engine

const storage = new GridFsStorage({
    url: 'mongodb+srv://ddung:yjbcEXVQhI6qcmRr@dailygroceries.i9b1fll.mongodb.net/DailyGroceries?retryWrites=true&w=majority',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);    
        });
      });
    }
  });
  const upload = multer({ storage });

export const imgResolvers = {
  // Upload: GraphQLUpload,
  Query: {
    getUserImg: async (_, args, context) => {
      //return await Image.find({});
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      const user = await User.findById(ID);
      
      if (!user) throw Error('User not found (?)');

      const tail = user.image;
      const head = 'http://res.cloudinary.com/dizogp0ro/image/upload/';
      const url = head.concat(tail);

      //console.log("Profile picture: ", url);

      return {url: url};
    },
    getProductImg: async (_, args, context) => {
      //return await Image.find({});
      const decoded = await decodeToken(context.token, jwtVariable.refreshTokenSecret);
      const ID = decoded.payload.userID;
      const user = await User.findById(ID)

      const note = await Product.find({userID: ObjectId(user)});

      const tail = user.image;
      const head = 'http://res.cloudinary.com/dizogp0ro/image/upload/';
      const url = head.concat(tail);

      return url;
    },
  },
  Mutation: {
    singleUpload: async (_, { photo }) => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      try {
        const result = await cloudinary.v2.uploader.upload(photo, {
          allowed_formats: ["jpg", "png"], //chose to allow only jpg and png upload
          public_id: "", //generates a new id for each uploaded image
          folder: "your_folder_name", //creates a folder called "your_folder_name" where images will be stored.
        });
      }
      catch (e) {
          return `Image could not be uploaded:${e.message}`; //returns an error message on image upload failure
        }
      /*returns uploaded photo url if successful `result.url`.
      if we were going to store image name in database,this
      */
      return `Successful-Photo URL: ${result.url}`;     
    },
  },
}

const image = [imgResolvers];

export default image;