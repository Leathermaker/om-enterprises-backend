import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    return res.status(400).send("Please provide email and password");
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    // Create and send token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      "YOUR_SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { adminLogin, createAdmin };
