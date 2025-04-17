import { Router } from "express";
import {
  createBlog,
  getBlogById,
  getBlogs
} from "../Controller/blog.controller.js";
import { authorizedRole, isAuthenticate } from "../middleware/Auth.Provider.js";

const router = Router();

router.post(
  "/create",
  isAuthenticate,
  authorizedRole("blogger", "admin"),
  createBlog
);
router.get("/all", getBlogs);
router.get("/:id", getBlogById);

export default router;
