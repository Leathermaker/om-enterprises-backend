import { Router } from "express";
import { adminLogin, createAdmin, otpValidation, otpGenerate } from "../Controller/admin.controller.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/login/generate/otp", otpGenerate);
router.post("/login/validate/otp", otpValidation);

export default router;
