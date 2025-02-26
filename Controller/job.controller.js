import { JobForm } from "../models/job/job.model.js";
import { JobApplyForm } from "../models/job/jobApply.model.js";

const addJob = async (req, res) => {
  try {
    const { title, qualification, gender, skill, mandatoryskill, location } = req.body;
    console.log(req.body);
    if (!title && !qualification && !gender && !skill && !location && !mandatoryskill) {
      return res.status(400).json({ message: "provide all details" });
    }
    const newJob = await JobForm.create({
      title,
      qualification,
      gender,
      mandatory: mandatoryskill,
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
    if (!id) {
      return res.status(400).json({ message: "provide job Id" });
    }
    const deletedJob = await JobForm.findOneAndDelete({ _id: id });
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
    const { jobId, name, email, phone,isFresher, availability } = req.body;
    const resume = req.imageUrl;
    console.log(req.body, resume)
    const job = await JobForm.findOne({ _id: jobId });
    if (!job) {
      return res.status(400).json({ message: "No job found" });
    }
    if (job) {
      if (!jobId && !name && !email && !availability && !resume) {
        return res.status(400).json({ message: "provide all details" });
      }
      const newJobApply = await JobApplyForm.create({
        jobId,
        name,
        email,
        phone,
        resume,
        isFresher,
        availability,
      })
      console.log(newJobApply)
      return res.status(200).json({ message: " job applied", newJobApply });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


//This function is an asynchronous function that gets all applied jobs
const getAllAppliedJobs = async (req, res) => {
  try {
    //Log a message to the console
    //Find all JobApplyForm documents and populate the jobId field
    console.log("get all applied jobs");
    //If no jobs are found, return a 400 status code with a message
    const jobs = await JobApplyForm.find().populate("jobId");
    console.log(jobs);
    if (!jobs) {
      return res.status(400).json({ message: "No jobs applied" });
      //Otherwise, return a 200 status code with a message and the jobs
    }
    return res.status(200).json({ message: " job Queries", jobs });
    //If there is an error, return a 500 status code with a message
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { addJob, allJobs, updateJob, deleteJob, applyJob, getAllAppliedJobs };
