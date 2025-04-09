import { Router } from "express"
import { applyJob } from "../../Controller/job.controller.js";
import multer from "multer";
import uploadFromUrl from "../../middleware/multer.js";


const router = Router();
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: multer.memoryStorage() })




router.post('/apply/job', 
    upload.single("resume"), // Handle single file upload
    uploadFromUrl,
    applyJob)

// title price 5 description []


export default router