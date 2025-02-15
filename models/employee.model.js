import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true, 
      trim: true,
    },
    phone: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
export const Employee = mongoose.model("Employee", employeeSchema);