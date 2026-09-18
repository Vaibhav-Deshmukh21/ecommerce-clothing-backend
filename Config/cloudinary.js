import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Corrected console log
console.log("Cloud Name:", process.env.CLOUDINARY_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image"
    });

    fs.unlinkSync(filePath); // Delete local file after upload
    return result.secure_url;

  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("Cloudinary Upload Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;