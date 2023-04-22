import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2' ;

const imageSchema= new mongoose.Schema({
  filename: String,
  filepath: String,
  mimetype: String,
  encoding: String,
  url: String,
})

//shareSchema.plugin(mongoosePaginate);
export const Image = mongoose.model("Image", imageSchema)
