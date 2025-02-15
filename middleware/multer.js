import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "debzdd4wk",
  api_key: "563232755929842",
  api_secret: "y_PwyywGHwjbqIA9d_YV9cFAgJY",
});

const uploadFromUrl = async (req, res, next) => {
  const { file } = req.body; // URL from frontend
    console.log(file)
  if (!file) {
    return res.status(400).json({ error: "No file URL provided" });
  }

  try {
    const result = await cloudinary.uploader.upload(file, { folder: "uploads" });

    req.fileUrl = result.secure_url;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Cloudinary upload failed", details: error.message });
  }
};

export default uploadFromUrl;
