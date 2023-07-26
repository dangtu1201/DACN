import mongoose from 'mongoose';
import moment from 'moment-timezone'
import Image from './imageModel.js'
import paginator from "mongoose-paginate-v2";
//moment(new Date()).tz("Asia/Ho_Chi_Minh").utc(true).toDate();
// const timeZone =  require('mongoose-timezone');
// const autoIncrement = require('mongoose-auto-increment');

const reqString = {
  type: String,
  unique: true,
  requied: true
}
const STATUS = ['Approved', 'Unapproved', 'Active', 'Inactive']

const shopSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  shopOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  CID: {
    type: String,
  },
  shopName: {
    type: String,
  },
  address: {
    type: String,
  },
  coordinates: {
    lat: {
      type: String
    },
    long: {
      type: String
    }
  },
  paymentMethod: [{
    type: String,
    enum: ['CASH', 'MOMO', 'ZALOPAY'],
  }],
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
  status:{
    type: String,
    enum: STATUS,
  },
  rating:{
    type: Number,
    default: 0,
  },
  rating_list:[{
    type: Number,
  }]
});

shopSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})

// shopSchema.pre("findOneAndUpdate", async function(next) {
//   const data = this.getUpdate()
//   const db_data = await this.model.findOne(this._conditions);
//   const old_rating = db_data.rating;

//   if (old_rating) data.rating = (data.rating + old_rating)/2;
//   else data.rating = data.rating;
  

//   this.update({}, data)
  
//   next()
// });


// export const Shop = mongoose.model("Shop", shopSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });
shopSchema.plugin(paginator);

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
