import mongoose from "mongoose";

const footerFormSchema = mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

export const footerForm = mongoose.model("Form", footerFormSchema);
