import {Router} from "express"
import { companyClientController, companyClientGetController } from "../Controller/companyClientController.js"
import uploadToCloudinary from "../middleware/multer.js"

const router  = Router()

router.post('/company/client',uploadToCloudinary,companyClientController)
router.get('/company/client',companyClientGetController)


export default router