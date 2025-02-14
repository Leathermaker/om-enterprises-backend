import { JobForm } from "../models/job.model.js";

const addJob = async (req, res) => {
  try {
    const { title, qualification, gender, skill, location } = req.body;
	console.log(req.body)
    if (!title && !qualification && !gender && !skill && !location) {
      return res.status(400).json({ message: "provide all details" });
    }
    const newJob = await JobForm.create({
      title,
      qualification,
      gender,
      skill,
      location
    });

    return res.status(200).json({ message: "new job created", newJob });
  } catch (error) {
    console.log(error);
  }
};








const updateJob = async (req, res) => {
	console.log("hi there")
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
		location
	  };
	  const updatedJob = await JobForm.updateOne(
		{ _id: jobId }, 
		{ $set: updatedData } 
	  );

      return res.status(200).json({ message: "new job created", updatedJob });
    }else{
		res.json({
			msg:"Jobs info is invalid"
		})
	}
  } catch (error) {
    console.log(error);
  }
};






const readJob = async (req, res) => {
  try {
    const response = await JobForm.find();
    res.json({
      msg: response
    });
  } catch (error) {
    console.log(error);
  }
};

export { addJob, readJob ,updateJob};
