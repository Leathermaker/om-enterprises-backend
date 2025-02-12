import { Router } from "express";
import { adminLogin, createAdmin, otpValidation, otpGenerate } from "../Controller/admin.controller.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/login/otp", otpGenerate);
router.post("/login/validation", otpValidation);

export default router;
