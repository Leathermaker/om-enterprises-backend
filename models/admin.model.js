import mongoose  from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp : {
    type: Number,
    required: false,
    default: null
  },
  role:{
    type: String,
    required: true,
    default: 'user'

  }
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
