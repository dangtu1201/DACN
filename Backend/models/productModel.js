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
    type: String,
    default: 'https://res.cloudinary.com/dizogp0ro/image/upload/v1690190704/daily-groceries/404_gduny9.jpg',
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
  },
  rating:{
    type: Number,
    default: 0,
  },
  rating_list:[{
    type: Number,
  }]
}
);

productSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})

// productSchema.post("findOneAndUpdate", async function(result) {
//     // const data = this.getUpdate()
//     const db_data = await this.model.findOne(this._conditions);
//     const rating_list = db_data.rating_list;

//     // rating_list.push(data.rating)
//     const average = rating_list.reduce((a, b) => a + b, 0) / rating_list.length;

//     // console.log(db_data.rating);
//     // const test = await this.update({}, {rating: average}, {new: true})
//     // console.log(test);
//     this.rating = average;
//     this.save(function(err){

//       console.log("Document Updated");       
//     });

//     // this.update({}, data)
    
//     // next()
//   });


// export const Product = mongoose.model("Product", productSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'Note', field: 'userID' });
productSchema.plugin(paginator);

const Product = mongoose.model('Product', productSchema);
export default Product;
