import { OTP } from "../models/otpModel.js"

export async function otpValidation(req,res){
	const {otp} = req.body
	console.log(otp)
	const response = await OTP.find({otp})
	if(response.length>0){
		res.json({
			msg:"Correct OTP"
		})
	}else{
		res.json({
			msg:"Incorrect OTP"
		})
	}
}