import {Router} from "express"
import { applyJob } from "../../Controller/job.controller.js";


const router = Router();


router.post('/apply/job', applyJob)
 

export default router