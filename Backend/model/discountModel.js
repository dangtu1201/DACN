import {Product} from './productModel.js'
import {User} from './userModel.js'
import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const discountSchema= new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    discount_percentage: {
        type: Number
    },
    active: {
        type: Boolean
    },
    createAt: {
        type: Date,
        default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
    },
    updateAt: {
        type: Date,
    },
});

discountSchema.pre("findOneAndUpdate", function(next) {
    const data = this.getUpdate()
  
    data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
    this.update({}, data)
    
    next()
  })

//shareSchema.plugin(mongoosePaginate);
export const Discount = mongoose.model("Discount", discountSchema)
