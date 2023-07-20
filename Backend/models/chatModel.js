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

const chatSchema = mongoose.Schema({
  email: reqString,
  phone: reqString,
  password: {
    type: String,
    requied: true,
  },
  roles: {
    type: [{
        type: String,
        enum: ['chat', 'shop']
    }],
    default: ['chat']
  },
  createAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  updateAt: {
    type: Date,
  },
  firstname: {
    type: String,
  },
  surname: {
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
    default: 'v1658478688/chat/default_am11ol.webp'
  }
});

chatSchema.pre("findOneAndUpdate", function(next) {
  const data = this.getUpdate()

  data.updateAt = moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate()
  this.update({}, data)
  
  next()
})


// export const Chat = mongoose.model("Chat", chatSchema);
// autoIncrement.initialize(mongoose.connection);
// chatSchema.plugin(autoIncrement.plugin, { model: 'Chat', field: 'chatID' });

chatSchema.plugin(paginator);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;

