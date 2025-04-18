import { Router } from "express";
import { adminLogin, createAdmin, otpValidation, otpGenerate, validateUser, updatePassword, changePassword, updateAdminDetails} from "../Controller/admin.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/login/generate/otp", otpGenerate);
router.post("/login/validate/otp", otpValidation);
router.put('/update/details',isAuthenticate,authorizedRole('admin'),updateAdminDetails);
router.put('/update/password',isAuthenticate,authorizedRole('admin'),updatePassword);
router.post('/change/password',isAuthenticate,authorizedRole('admin'),changePassword);

router.get("/validate",isAuthenticate, authorizedRole('admin','blogger'), validateUser); 

export default router;
  