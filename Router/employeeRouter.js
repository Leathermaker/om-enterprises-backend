import { Router } from "express";
import uploadFromUrl from "../middleware/multer.js";
import { allEmployees, deleteEmployee, employeeController } from "../Controller/employeeController.js";


const router = Router()


router.post('/employee',uploadFromUrl,employeeController)
router.put('/employee',uploadFromUrl,employeeController)
router.get('/employee',allEmployees)
router.delete('/employee',deleteEmployee)





export default router