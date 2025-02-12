import mongoose from "mongoose";

const formPricingSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

export const formPricing = mongoose.model("princingForm", formPricingSchema);
