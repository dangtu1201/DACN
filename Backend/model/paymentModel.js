import {Product} from './productModel.js'
import {User} from './userModel.js'
import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const PAYMENT = ['MOMO', 'ZALOPAY']

const paymentSchema= new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    quantity: {
        type: Number
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
    }

})

//shareSchema.plugin(mongoosePaginate);
export const Payment = mongoose.model("Payment", paymentSchema)
