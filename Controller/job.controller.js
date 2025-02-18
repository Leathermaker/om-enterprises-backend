import { JobForm } from "../models/job/job.model.js";
import { JobApplyForm } from "../models/job/jobApply.model.js";

const addJob = async (req, res) => {
  try {
    const { title, qualification, gender, skill, location } = req.body;
    console.log(req.body);
    if (!title && !qualification && !gender && !skill && !location) {
      return res.status(400).json({ message: "provide all details" });
    }
    const newJob = await JobForm  .create({
      title,
      qualification,
      gender,
      skill,
      location,
    });

    return res.status(200).json({ message: "new job created", newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });

  }
};

const updateJob = async (req, res) => {
  try {
    const { jobId, title, qualification, gender, skill, location } = req.body;
    const response = await JobForm.find({ _id: jobId });
    if (response) {
      if (!title || !qualification || !gender || !skill || !location) {
        return res.status(400).json({ message: "provide all details" });
      }
      const updatedData = {
        title,
        qualification,
        gender,
        skill,
        location,
      };
      const updatedJob = await JobForm.updateOne(
        { _id: jobId },
        { $set: updatedData }
      );

      return res.status(200).json({ message: "new job created", updatedJob });
    } else {
      res.json({
        msg: "Jobs info is invalid",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });

  }
};


const allJobs = async (req, res) => { 
  try {
    const jobs = await JobForm.find();
    if (!jobs) {
      return res.status(400).json({ message: "No jobs" });
    }
    return res.status(200).json({ message: " jobs", jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
}
}
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({ message: "provide job Id" });
    }
   const deletedJob  = await JobForm.findOneAndDelete({ _id: id });
   return res.json({
      msg: "Job deleted",
      deletedJob,
    })
  } catch (error) {
   return res.status(500).json({ message: "Server error" });

  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId, name, email, phone, resume, availability } = req.body;
    const job = await JobForm.findOne({ _id: jobId });
    if (job) {
      if (!name && !email && !availability && !resume) {
        return res.status(400).json({ message: "provide all details" });
      }
      const newJobApply = await JobApplyForm.create({
        jobId,
        name,
        email,
        phone,
        resume,
        availability,
      })
      return res.status(200).json({ message: " job applied", newJobApply });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" , error: error.message });
  }
};


const getAllAppliedJobs = async (req, res) => {
  try {
      console.log("get all applied jobs");
    const jobs = await JobApplyForm.find().populate("jobId");
    if (!jobs) {
     return res.status(400).json({ message: "No jobs applied" });
    }
    return res.status(200).json({ message: " job applied", jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { addJob, allJobs, updateJob, deleteJob, applyJob ,getAllAppliedJobs};
