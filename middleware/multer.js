import axios from "axios";
import fs from "fs";
import cloudinary from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: "debzdd4wk",
  api_key: "563232755929842",
  api_secret: "y_PwyywGHwjbqIA9d_YV9cFAgJY",
});
const uploadFromUrl = async (req, res, next) => {
  try {
    if (!req.file) {
     return next();
      // return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Attach the Cloudinary URL to the request object
    req.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image " });
  }
};

export default uploadFromUrl;