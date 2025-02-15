import {Router} from "express"
import { companyClientController } from "../Controller/companyClientController.js"
import uploadToCloudinary from "../middleware/multer.js"

const router  = Router()

router.post('/company/client',uploadToCloudinary,companyClientController)


export default router