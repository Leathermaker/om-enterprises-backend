import {Router} from "express"
import { addJob,deleteJob,getAllAppliedJobs,readJob, updateJob } from "../Controller/job.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";


const router = Router();


router.post('/create/job', isAuthenticate,authorizedRole("admin"), addJob)
router.get('/read/job', isAuthenticate,authorizedRole("admin"), readJob)
router.put('/update/job', isAuthenticate,authorizedRole("admin"), updateJob)   
router.delete('/delete/job', isAuthenticate,authorizedRole("admin"), deleteJob)   
router.get('/get/job', isAuthenticate,authorizedRole("admin"), getAllAppliedJobs)   

export default router