import {Product} from './productModel.js'
import {User} from './userModel.js'
import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const cartSchema= new mongoose.Schema({
    _id: {
      type: String,
    }, 
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    },
    product: [{
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
      },
      quantity:{
        type: Number
      }
    }],
    createAt: {
        type: Date,
        default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
    },
    updateAt: {
        type: Date,
    },
});

cartSchema.pre("findOneAndUpdate", function(next) {
    const data = this.getUpdate()
  
    data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
    this.update({}, data)
    
    next()
  })

//shareSchema.plugin(mongoosePaginate);
export const Cart = mongoose.model("Cart", cartSchema)
