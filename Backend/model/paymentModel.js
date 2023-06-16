import {Product} from './productModel.js'
import {User} from './userModel.js'
import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const PAYMENT = ['MOMO', 'ZALOPAY', 'CASH']

const paymentSchema= new mongoose.Schema({
    products: [{
        product:{
          type: mongoose.Schema.Types.ObjectId,
          ref: Product
        },
        quantity:{
          type: Number
        }
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    subtotal: {
        type: Number
    },
    discount:{
        type: Number
    },
    coupon: {
        type: Number
    },
    total: {
        type: Number
    },
    paymentMethod:{
        type: String,
        enum: PAYMENT
    },
    status:{
        type: String,
        enum: ["Done","Cancel","Processing"]
    }

})

//shareSchema.plugin(mongoosePaginate);
export const Payment = mongoose.model("Payment", paymentSchema)
