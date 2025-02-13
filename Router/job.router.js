import {Router} from "express"
import { addJob } from "../Controller/job.controller";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider";


const router = Router();


router.post('/create/job', isAuthenticate,authorizedRole("admin"), addJob)