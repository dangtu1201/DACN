import mongoose from 'mongoose';
import moment from 'moment-timezone';
import User from './userModel.js'
import paginator from "mongoose-paginate-v2";

const CATEGORY = []
const STATUS = ['Active','Inactive']

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
  discount_id: [{
    type: mongoose.Types.ObjectId,
    ref: 'Discount'
  }],
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  shop: {
    type: mongoose.Types.ObjectId,
    ref: 'Shop'
  },
  image: {
    type: mongoose.Types.ObjectId,
    ref: 'Image'
  },
  category: [
    {
      type: String,
      enum: CATEGORY
    }
  ],
  activeTime:{
    from: {
      type: String
    },
    to: {
      type: String
    }
  },
  status:{
    type: String,
    enum: STATUS
  }
}
);

productSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})


// export const Product = mongoose.model("Product", productSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'Note', field: 'userID' });
productSchema.plugin(paginator);

const Product = mongoose.model('Product', productSchema);
export default Product;
