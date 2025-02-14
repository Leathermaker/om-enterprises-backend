import mongoose from "mongoose";
const jobFormSchema = mongoose.Schema({
    title: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});
export const JobForm = mongoose.model("JobForm", jobFormSchema);
