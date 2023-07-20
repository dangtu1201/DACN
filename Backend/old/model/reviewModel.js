import {Product} from './productModel.js'
import {User} from './userModel.js'
import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const commentSchema= new mongoose.Schema({
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    body: {
      type: String,
      require: true
    },
    star: {
      type: Int,
    },
    createAt: {
        type: Date,
        default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
    },
    updateAt: {
        type: Date,
    },
    image:{
      type: String,
      default: 'v1658478688/user/default_am11ol.webp'
    }
});

commentSchema.pre("findOneAndUpdate", function(next) {
    const data = this.getUpdate()
  
    data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
    this.update({}, data)
    
    next()
  })

//shareSchema.plugin(mongoosePaginate);
export const Comment = mongoose.model("Comment", commentSchema)
