import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { v2 as cloudinary } from "cloudinary";

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
    console.log("Error in uploading");
  }
};

export const updateImageByUrl = async (oldImageUrl, newImageFile) => {
  try {
    // Step 1: Retrieve the details of the existing image
    const oldImageDetails = cloudinary.utils.extractPublicId(oldImageUrl);

    // Step 2: Upload the new image
    const result = await cloudinary.uploader.upload(newImageFile, {
      public_id: oldImageDetails.public_id,
      format: oldImageDetails.format,
    });

    // Step 3: Update the Cloudinary asset by replacing the existing image
    console.log("Updated Image URL:");
    return result;
  } catch (error) {
    console.error("Error updating image:", error.message);
  }
};
