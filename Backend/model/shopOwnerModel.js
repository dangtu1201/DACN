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

const shopOwnerSchema = mongoose.Schema({
  username: reqString,
  email: reqString,
  password: {
    type: String,
    requied: true,
  },
  roles: 
  {
    User: {
      type: Number,
      default: 2001
    },
    Admin: Number
  },
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  firstname: {
    type: String,
  },
  surname: {
    type: String,
  },
  paymentMethod: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    }
  ],
  customer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  image:{
    type: String,
    default: 'v1658478688/user/default_am11ol.webp'
  }
});

shopOwnerSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})


export const ShopOwner = mongoose.model("ShopOwner", shopOwnerSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

