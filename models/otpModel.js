import mongoose from "mongoose";
 const otpSchema = mongoose.Schema({ 	otp:String }) 
export const OTP = mongoose.model("OTP",otpSchema)