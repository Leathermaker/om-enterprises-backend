import { JobForm } from "../models/job.model"

const addJob = async(req, res)=>{
     const { title , qualification, gender, skill , location} = req.body;

	 if(!title || !qualification || gender || !skill || !location){
		return res
        .status(400)
        .json({ message: "provide all details" });
	 }
const newJob = JobForm.create({
	title,
	qualification,
	gender,
	skill,
	location
})

return res.status(200).json({message: "new job created", newJob, })
}


export {
	addJob
}