import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
 
  image: {
    type: String,
  },
  title :{
   type: String,
   required: true,
  },
  content :{
   type: String,
   required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true})

export const Blog = mongoose.model("Blog", BlogSchema);