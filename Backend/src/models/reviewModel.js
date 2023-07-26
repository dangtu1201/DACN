import Product from './productModel.js'
import Shop from './shopModel.js'
import User from './userModel.js'
import mongoose from 'mongoose';
import paginator from "mongoose-paginate-v2";
import moment from 'moment-timezone';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const reviewSchema= new mongoose.Schema({
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    body: {
      type: String,
      require: true
    },
    rating: {
      type: Number,
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
    }
});

reviewSchema.pre("findOneAndUpdate", function(next) {
    const data = this.getUpdate()
  
    data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
    this.update({}, data)
    
    next()
  });

// reviewSchema.pre("save", function(next) {
//     const data = this.getUpdate()
  


//     this.update({}, data)
    
//     next()
//   });

//shareSchema.plugin(mongoosePaginate);
// export const Comment = mongoose.model("Comment", commentSchema)
reviewSchema.plugin(paginator);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
