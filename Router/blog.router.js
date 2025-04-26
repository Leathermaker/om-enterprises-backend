import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
  getBlogByTitle,
} from "../Controller/blog.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";
import multer from "multer";
import uploadFromUrl from "../middleware/multer.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  upload.single("image"), 
  isAuthenticate,
  authorizedRole("blogger", "admin"),
  uploadFromUrl,
  createBlog
);
router.get("/all", getBlogs);
router.get("/:id", getBlogById);
router.get("/title/:title", getBlogByTitle);
router.delete("/delete/:id",isAuthenticate, authorizedRole("blogger","admin"), deleteBlog);
router.put("/edit/:id", isAuthenticate, authorizedRole("admin", "blogger"), updateBlog);

export default router;
