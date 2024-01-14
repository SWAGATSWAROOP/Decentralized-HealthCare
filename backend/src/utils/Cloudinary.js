import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

export const uploadProfilePhoto = async (localPath, email) => {
  try {
    // if path is not present
    if (!localPath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localPath, {
      public_id: email,
      resource_type: "image",
      overwrite: true,
    });
    // getting url of the file
    console.log("File is uploaded on cloudinary", response.url);
    return response.secure_url;
  } catch (error) {
    console.log("Error in uploading");
  }
};

export const removePhoto = async (email) => {
  try {
    await cloudinary.uploader.destroy(email, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (error) {
    console.log("Not Able to delete");
  }
};
