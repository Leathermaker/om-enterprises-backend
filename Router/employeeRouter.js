import { Router } from "express";
import uploadFromUrl from "../middleware/multer.js";
import {
  allEmployees,
  deleteEmployee,
  employeeController,
  updateEmployee,
} from "../Controller/employeeController.js";
import multer from "multer";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";

const router = Router();
const upload = multer({ dest: "uploads/" });
router.post(
  "/employee",
  isAuthenticate,
  authorizedRole("admin"),
  upload.single("image"), // Handle single file upload
  uploadFromUrl,
  employeeController
);
router.put(
  "/employee/:id",
  isAuthenticate,
  authorizedRole("admin"),
  updateEmployee
);
router.get("/employee", allEmployees);
router.delete(
  "/employee/:id",
  isAuthenticate,
  authorizedRole("admin"),
  deleteEmployee
);

export default router;
