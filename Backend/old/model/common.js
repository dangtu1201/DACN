import mongoose, { Schema, SchemaType } from 'mongoose';

export const userSchema_c = new Schema({
    email: reqString,
    phone: reqString,
    password: {
        type: String,
        requied: true,
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'shop']
        }],
        default: ['user']
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
        default: 'v1658478688/user/default_am11ol.webp'
    }
},{
    _id: false
});

// export const priceDetailSchema = new Schema({
//     name: {type: String, index: true},
//     price: fromToSchema,
//     area: fromToSchema
// },{
//     _id: false
// });