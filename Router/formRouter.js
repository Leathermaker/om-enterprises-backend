import { Router } from "express";
import { footerFormController, footerFormGet } from "../Controller/footerFormController.js";
import { contactUsFormController, contactUsFormGetController } from "../Controller/contactUsFormController.js";
import { servicesForm, servicesFormGet } from "../Controller/servicesFormController.js";


const router = Router();

//footer form
router.post("/footer/form",footerFormController);
router.get("/footer/form",footerFormGet);

//instant call back
router.post("/services/form",servicesForm);
router.get("/services/form",servicesFormGet);




//contact us
router.post("/contactus/form",contactUsFormController);
router.get("/contactus/form",contactUsFormGetController);

export default router;
