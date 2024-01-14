import jwt from "jsonwebtoken";
import { updateImageByUrl, uploadProfilePhoto } from "../utils/Cloudinary.js";
import { removeFile } from "../utils/unlinkFile.js";
import ApiResponse from "../utils/APIresponse.js";
import { User } from "../models/auth.js";

export const updateProfile = async (req, res) => {
  const localPath = req.files?.profilephoto[0]?.path || "";
  try {
    const decodedToken = jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    const oldpath = user.profilephoto;
    let response;
    if (oldpath) {
      response = updateImageByUrl(oldpath, localPath);
    } else {
      response = uploadProfilePhoto(localPath);
    }
    const up = await User.findByIdAndUpdate(
      user.id,
      { $set: { profilephoto: response.url || "" } },
      {
        new: true,
      }
    );
    if (!up) {
      console.log("Error in Uploading the file");
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Error in Uploading"));
    }
    return response
      .status(200)
      .json(new ApiResponse(200, {}, "Successfully updated"));
  } catch (error) {
    console.log("Error in uploading the file");
    return res.status(500).json(new ApiResponse(500, {}, "Error in Uploading"));
  } finally {
    removeFile(localPath);
  }
};
