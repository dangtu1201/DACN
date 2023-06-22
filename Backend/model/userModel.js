import mongoose from 'mongoose';
import moment from 'moment-timezone'
import {Image} from './imageModel.js'
import mongoosePaginate from 'mongoose-paginate-v2';
//moment(new Date()).tz("Asia/Ho_Chi_Minh").utc(true).toDate();
// const timeZone =  require('mongoose-timezone');
// const autoIncrement = require('mongoose-auto-increment');

const reqString = {
  type: String,
  unique: true,
  requied: true
}

const userSchema = mongoose.Schema({
  email: reqString,
  phone: reqString,
  password: {
    type: String,
    requied: true,
  },
  roles: {
    type: [{
        type: String,
        enum: ['user', 'shop']
    }],
    default: ['user']
  },
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  name: {
    type: String,
  },
  favoriteShop: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    }
  ],
  paymentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    }
  ],
  image:{
    type: String,
    default: 'v1658478688/user/default_am11ol.webp'
  }
});

userSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})


export const User = mongoose.model("User", userSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

