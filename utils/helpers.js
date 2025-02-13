import otp from "otp-generator";
import { Admin } from "../models/admin.model.js";

async function otpGenerator() {
	const otpInfo = otp.generate(4, {
	  digits: true,
	  upperCaseAlphabets: false,
	  lowerCaseAlphabets:false,
	  specialChars: false,
	});
  
	// const otpItem = new Admin({ otp: otpInfo });
	// const response = await otpItem.save();
	// console.log(response);
  
	return otpInfo;
  }

  
  export { 
	otpGenerator
  }