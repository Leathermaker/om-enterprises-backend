import {Router} from "express"
import { addJob,readJob } from "../Controller/job.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";


const router = Router();


router.post('/create/job', isAuthenticate,authorizedRole("admin"), addJob)
router.get('/read/job', isAuthenticate,authorizedRole("admin"), readJob)
router.put('/update/job', isAuthenticate,authorizedRole("admin"), readJob)

export default router