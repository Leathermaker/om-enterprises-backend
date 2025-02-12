import { Router } from "express";
import { otpGenerate } from "../Controller/otpGenerateController.js";
import { otpValidation } from "../Controller/otpValidationController.js";
import { adminLogin, createAdmin } from "../Controller/auth.controller.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/login/otp", otpGenerate);
router.post("/login/validation", otpValidation);

export default router;
