import ApiResponse from "../utils/APIresponse";
import { updateImageByUrl } from "../utils/Cloudinary.js";

export const updatePhoto = async (req, res) => {
  //check if profile photo exist or logo
  const localPath = req.files?.profilephoto[0]?.path;
  const oldPath = req.oldPath;
  try {
    await updateImageByUrl(oldPath, profilePhotopath);
    console.log("Updated Successfully");
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updated Successfully"));
  } catch (error) {
    console.log("Error in updating photo");
    return res.status(500).json(new ApiResponse(500, {}, "failed"));
  } finally {
    fs.unlinkSync(localPath);
  }
};
