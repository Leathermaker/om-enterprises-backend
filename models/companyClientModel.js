import mongoose from "mongoose";

const companyClinetSchema = mongoose.Schema({
  file: String,
  companyName: String,
  rating: Number,
  comment: String
});

export const companyClient = mongoose.model("companyClient", companyClinetSchema);
