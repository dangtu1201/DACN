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

const userSchema = mongoose.Schema({
  email: reqString,
  phone: reqString,
  password: {
    type: String,
    requied: true,
  },
  roles: {
    type: String,
    enum: ['User', 'Admin']
  },
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  name: {
    type: String,
  },
  favoriteShop: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    }
  ],
  paymentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    }
  ],
  image:{
    type: String,
    default: 'https://res.cloudinary.com/dizogp0ro/image/upload/v1690190704/daily-groceries/404_gduny9.jpg',
  }
});

userSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})


// export const User = mongoose.model("User", userSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });
userSchema.plugin(paginator);

const User = mongoose.model('User', userSchema);
export default User;
