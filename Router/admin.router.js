import { Router } from "express";
import { adminLogin, createAdmin, otpValidation, otpGenerate } from "../Controller/admin.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/login/generate/otp", otpGenerate);
router.post("/login/validate/otp", otpValidation);


router.get("/validate",isAuthenticate, authorizedRole('admin'), (req, res) => {
    res.status(200).json({ message: "Admin verified successfully" });
  });

export default router;
