import mongoose from "mongoose";

const companyClinetSchema = mongoose.Schema({
  img: { type: String, required: true },
  companyName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export const companyClient = mongoose.model(
  "companyClient",
  companyClinetSchema
);
