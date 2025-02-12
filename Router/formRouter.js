import { Router } from "express";
import { footerFormController } from "../Controller/footerFormController.js";
import { contactUsFormController } from "../Controller/contactUsFormController.js";
import { servicesForm } from "../Controller/servicesFormController.js";


const router = Router();

router.post("/footer/form",footerFormController);
router.post("/services/form",servicesForm);
router.post("/contactus/form",contactUsFormController);

export default router;
