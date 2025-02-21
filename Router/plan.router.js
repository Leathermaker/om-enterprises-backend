import { Router } from "express"
import { addPlan } from "../Controller/plan.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
const router = Router();

//job todo
router.post("/add",isAuthenticate, authorizedRole("admin"), addPlan);

export default router