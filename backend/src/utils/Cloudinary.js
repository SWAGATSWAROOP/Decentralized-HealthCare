import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadProfilePhoto = async (localPath) => {
  try {
    // if path is not present
    if (!localPath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    // getting url of the file
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    // remove the locally saved temporary file from the server as the operation got failed
    fs.unlinkSync(localPath);
  }
};
