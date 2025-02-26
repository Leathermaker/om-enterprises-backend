import mongoose from "mongoose";
const jobApplySchema = mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobForm",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isFresher: {
      type: Boolean,
      default: true,
    },
    availability: {
      type: String,
      enum: ["full-time", "part-time", "freelance "],
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);
export const JobApplyForm = mongoose.model("JobApplyForm", jobApplySchema);
