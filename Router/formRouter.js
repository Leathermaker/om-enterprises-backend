import { Router } from "express";
import { allInstantCallBackQueries, getAllContactQueries, instantCallBackQuery, postContactUs } from "../Controller/instantCall.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";


const router = Router();

//footer form
router.post("/instant/call", instantCallBackQuery);
router.get("/instant/call",
    isAuthenticate,
    authorizedRole("admin"),
    allInstantCallBackQueries);


//contact us
router.post("/form/contact", postContactUs);
router.get("/form/contact",
    isAuthenticate,
    authorizedRole("admin"),
    getAllContactQueries);

export default router;
