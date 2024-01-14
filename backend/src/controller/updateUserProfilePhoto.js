import { uploadProfilePhoto, removePhoto } from "../utils/Cloudinary.js";
import { removeFile } from "../utils/unlinkFile.js";
import ApiResponse from "../utils/APIresponse.js";
import { User } from "../models/auth.js";
import { decodedJWT } from "../utils/deCodeToken.js";

export const updateProfile = async (req, res) => {
  const localPath = req.files?.profilephoto[0]?.path || "";
  try {
    const decodedToken = decodedJWT(req.cookies.accessToken);
    if (!decodedToken) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Cannot fetch accessToken"));
    }
    const response = await uploadProfilePhoto(localPath, decodedToken.email);
    const up = await User.findByIdAndUpdate(
      decodedToken._id,
      { $set: { profilephoto: response } },
      {
        new: true,
      }
    );

    if (!up) {
      console.log("Error in the file");
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Error in Creating user"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { response }, "Successfully updated"));
  } catch (error) {
    console.log("Error in the file");
    return res.status(500).json(new ApiResponse(500, {}, "Error Uploading"));
  } finally {
    removeFile(localPath);
  }
};

//remove profilephoto
export const removephoto = async (req, res) => {
  try {
    const decodedToken = decodedJWT(req.cookies.accessToken);
    await User.findByIdAndUpdate(
      decodedToken._id,
      {
        $set: {
          profilephoto: "",
        },
      },
      {
        new: true,
      }
    );

    const remP = await removePhoto(decodedToken.email);
    if (!remP) {
      return res.status(500).json(new ApiResponse(500, {}, "Unable To delete"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Successfully Removed"));
  } catch (error) {}
};
