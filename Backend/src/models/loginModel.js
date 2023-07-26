import mongoose from 'mongoose';
import moment from 'moment-timezone'
import paginator from "mongoose-paginate-v2";
// const timeZone =  require('mongoose-timezone');

const AS = ['User','Shop']

const loginSchema =  mongoose.Schema({
  userID: {
    type: String,
    unique: true,
    requied: true,
  },
  loginAt: {
    type: Date,
    default: moment().tz("Asia/Ho_Chi_Minh").utc(true).toDate(),
  },
  logoutAt: {
    type: Date,
  },
  refreshToken: {
    type: String,
  },
  as:{
    type: String,
    enum: AS,
    default: 'User',
  }
});

// loginSchema.plugin(timeZone);
// export const Login = mongoose.model("Login", loginSchema);

loginSchema.plugin(paginator);

const Login = mongoose.model('Login', loginSchema);
export default Login;
