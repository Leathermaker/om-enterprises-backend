import axios from "axios";
import fs from "fs"
import cloudinary from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: "debzdd4wk",
  api_key: "563232755929842",
  api_secret: "y_PwyywGHwjbqIA9d_YV9cFAgJY",
});



const uploadFromUrl = async (req, res, next) => {
    try {
        const { imageUrl } = req.body;
        console.log(imageUrl)
    
        if (!imageUrl) {
          return res.status(400).json({ error: "Image URL is required" });
        }
    
        // Download the image
        const response = await axios({
          url: imageUrl,
          responseType: "arraybuffer",
        });
    
        const tempPath = `uploads/temp-image-${Date.now()}.jpg`;
        fs.writeFileSync(tempPath, Buffer.from(response.data, "binary"));
    
        // Upload to Cloudinary
        const result = await cloudinary.v2.uploader.upload(tempPath, {
          folder: "uploads",
        });
    
        // Delete temporary file
        fs.unlinkSync(tempPath);
        console.log(result.secure_url)
        req.file =  result.secure_url
        next()
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error uploading image" });
      }
};

export default uploadFromUrl;
