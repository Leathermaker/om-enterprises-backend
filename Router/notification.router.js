import { Router } from "express"
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
import { getAllNotification } from "../Controller/notification.controller.js";
const router = Router();


router.get("/all", isAuthenticate, authorizedRole("admin"), getAllNotification);


export default router   