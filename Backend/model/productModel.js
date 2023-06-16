import mongoose from 'mongoose';
import moment from 'moment-timezone';
import {User} from './userModel.js'

const CATEGORY = []

const productSchema =  mongoose.Schema({
  name: {
    type: String,
    default: 'Your product',
  },
  description: {
    type: String,
    default: 'Your description',
  },
  quantity: {
    type: Number
  },
  price_old: {
    type: Number
  },
  price: {
    type: Number
  },
  discountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  },
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  image: {
    type: String,
  },
  category: [
    {
      type: String,
      enum: CATEGORY
    }
  ]
}
);

productSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})


export const Product = mongoose.model("Product", productSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'Note', field: 'userID' });
