import { Router } from "express";
import {
  addClient,
  getClientById,
  getClients,
  removeClient,
  updateClient,
} from "../Controller/companyClientController.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
import uploadFromUrl from "../middleware/multer.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });


router.post(
  "/add/client",
  isAuthenticate,
  authorizedRole("admin"),
  upload.single("image"), // Handle single file upload
  uploadFromUrl,
  addClient
);
router.get("/get/client", getClients);
router.get("/company/client/:id", getClientById);
router.put(
  "/update/client/:id",
  isAuthenticate,
  authorizedRole("admin"),
  upload.single("image"),
  uploadFromUrl,
  updateClient
);
router.delete(
  "/delete/client/:id",
  isAuthenticate,
  authorizedRole("admin"),
  removeClient
);

export default router;
