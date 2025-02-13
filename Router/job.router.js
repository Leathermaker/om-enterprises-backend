import {Router} from "express"
import { addJob } from "../Controller/job.controller";


const router = Router();


router.post('/create/job', addJob)