// import mongoose from "mongoose";
const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  companyName: { type: String, required: true },
  service: { type: String, required: true },
  isDeveloper: { type: Boolean, default: false },
  hearAboutUs: { type: String, required: true },
  message: { type: String, required: true },
 
}, { timestamps: true });

 module.exports = mongoose.model("contactUsForm", contactUsSchema);

