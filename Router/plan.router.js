import { Router } from "express"
import { addPlan, deletePlan, getPlan, updatePlan } from "../Controller/plan.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
const router = Router();

//job todo
router.post("/add",isAuthenticate, authorizedRole("admin"), addPlan);
router.get("/get/:category",getPlan)
router.delete("/delete/:id",deletePlan) 
router.put('/update/:id',updatePlan)

export default router   