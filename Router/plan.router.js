import { Router } from "express"
import { addPlan, getPlan } from "../Controller/plan.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
const router = Router();

//job todo
router.post("/add",isAuthenticate, authorizedRole("admin"), addPlan);
router.get("/get",getPlan)

export default router