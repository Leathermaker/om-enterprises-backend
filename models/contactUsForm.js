import mongoose from "mongoose";

const contactUsSchema = mongoose.Schema({
  name: String,
  email: String,
  location: String,
  companyName: String,
  services: String,
  isDeveloper: Boolean,
  hearFrom: String,
  message: String,
});

export const formContact = mongoose.model("contactUsForm", contactUsSchema);
