import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nodeMailerSender, twilioSender } from "../utils/credential.sender.js";

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
      role: "admin"
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
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
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
      httpOnly: true, // Prevent client-side JS access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

async function otpGenerate(req, res) {
  const { payload } = req.body; // Destructure payload from request body
  console.log(payload);

  try {
    if (!payload) {
      return res.status(400).json({ message: "Provide phone or email" });
    }

    // Check if payload is an email or phone number
    const isEmail = /\S+@\S+\.\S+/.test(payload); // Simple email regex

    if (isEmail) {
      const admin = await Admin.findOne({ email: payload.email });
      if (!admin) return res.status(400).json({ message: "Admin not found" });
      await nodeMailerSender(admin);
      return res.json({ message: "Mail is sent successfully" });
    } else {
      const admin = await Admin.findOne({ phone: Number (payload.phone) });
      if (!admin) return res.status(400).json({ message: "Admin not found" });
      await twilioSender(admin);
      return res.json({ message: "OTP is sent successfully" });
    }
  } catch (error) {
    console.error("OTP generation error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


async function otpValidation(req, res) {
  const { otp } = req.body;
  
  console.log("Received OTP:", otp);

  try {
    // Find admin by OTP
    const admin = await Admin.findOne({ otp });
    
    console.log("Admin Found:", admin);

    if (!admin) {
      return res.status(400).json({ msg: "Incorrect OTP" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "YOUR_SECRET_KEY",
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side JS access
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Remove OTP after validation
    admin.otp = undefined;
    await admin.save();

    return res.status(200).json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error("OTP Validation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}



export { adminLogin, createAdmin, otpValidation, otpGenerate };
