import {Router} from "express"
import { addJob,deleteJob,readJob, updateJob } from "../Controller/job.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";


const router = Router();


router.post('/create/job', isAuthenticate,authorizedRole("admin"), addJob)
router.get('/read/job', isAuthenticate,authorizedRole("admin"), readJob)
router.put('/update/job', isAuthenticate,authorizedRole("admin"), updateJob)   
router.delete('/delete/job', isAuthenticate,authorizedRole("admin"), deleteJob)   

export default router