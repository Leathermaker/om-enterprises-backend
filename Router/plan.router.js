import { Router } from "express"
import { addPlan, deletePlan, getPlan, updatePlan } from "../Controller/plan.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
const router = Router();


router.post("/add", isAuthenticate, authorizedRole("admin"), addPlan);
router.get("/get/:category", getPlan)
router.delete("/delete/:id", isAuthenticate, authorizedRole("admin"), deletePlan)
router.put('/update/:id', isAuthenticate, authorizedRole("admin"), updatePlan)

export default router   