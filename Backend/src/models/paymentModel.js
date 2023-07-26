import Product from './productModel.js'
import User from './userModel.js'
import Shop from './shopModel.js'
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import paginator from "mongoose-paginate-v2";
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const PAYMENT = ['MOMO', 'ZALOPAY', 'CASH']

const paymentSchema= new mongoose.Schema({
    products: [{
        _id: false,
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        quantity:{
          type: Number
        }
    }],
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    shop:{
        type: mongoose.Types.ObjectId,
        ref: 'Shop'
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
    },
    createAt: {
        type: Date,
        default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
    },
    updateAt: {
        type: Date,
    },

})

// paymentSchema.post('save', function(next) {

//     // do something

//     next();   //dont forget next();

// });

// paymentSchema.post('update', function(next) {

//     // do something

//     next();   //dont forget next();

// });

//shareSchema.plugin(mongoosePaginate);
// export const Payment = mongoose.model("Payment", paymentSchema)

paymentSchema.plugin(paginator);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;