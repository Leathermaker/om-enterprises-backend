import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import twilio from "twilio";
import otp from "otp-generator";


// Create a new user
const createAdmin = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "YOUR_SECRET_KEY", // Use environment variable
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,    // Prevent client-side JS access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




 async function otpValidation(req,res){
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



async function otpGenerator() {
  const otpInfo = otp.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets:false,
    specialChars: false,
  });

  const otpItem = new OTP({ otp: otpInfo });
  const response = await otpItem.save();
  console.log(response);

  return otpInfo;
}

async function nodeMailerSender() {
  const otp = await otpGenerator();
  console.log(otp);

  const getOtpDb = await OTP.find({ otp });
  console.log(getOtpDb);

  if (getOtpDb.length > 0) {
    setTimeout(async () => {
      const response = await OTP.deleteOne({ otp });
      console.log(response);
    }, 100000);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "aliyah.thiel@ethereal.email",
      pass: process.env.ETHREAL_PASS,
    },
    text: otp,
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <aliyah.thiel@ethereal.email>', // sender address
      to: "aliyah.thiel@ethereal.email", // recipient
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `Otp: ${otp}`, // HTML body
    });

  }

  main().catch(console.error);
}

async function twilioSender() {
  const otp = await otpGenerator();
  console.log(otp);

  const getOtpDb = await OTP.find({ otp });
  console.log(getOtpDb);

  if (getOtpDb.length > 0) {
    setTimeout(async () => {
      const response = await OTP.deleteOne({ otp });
      console.log(response);
    }, 100000);
  }


  const accountSid = process.env.ACCOUNTSID;
  const authToken = process.env.AUTHTOKEN;
  const client = new twilio(accountSid, authToken);
console.log(client, accountSid, authToken)

  async function sendSMS() {
    try {
      const message = await client.messages.create({
        body: `Do not share the OTP: ${otp}, use within 1 minute`,
        from: "+17179225895", // Your Twilio phone number
        to: "+91 7814897900",
        username: "aliyah.thiel@ethereal.email"
        // Recipient's phone number
      });

      console.log("Message sent successfully:", message.sid);
      console.log(message);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  }

  sendSMS();
}

 async function otpGenerate(req, res) {
  const { creditionalId, password } = req.body;

  try {
    if (creditionalId.length) {
      // Send email OTP
      console.log("inside");
      nodeMailerSender();
      res.json({ msg: "Mail is sent successfully" });
    } else {
      // Send phone OTP
      twilioSender();
      res.json({ msg: "OTP is sent successfully" });
    }
  } catch (error) {
    console.log(error);
  }
}



export { adminLogin, createAdmin, otpValidation , otpGenerate};
