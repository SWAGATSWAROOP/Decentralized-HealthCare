import { decodedJWT } from "../utils/deCodeToken.js";
import { uploadProfilePhoto } from "../utils/Cloudinary.js";
import { removeFile } from "../utils/unlinkFile.js";
import ApiResponse from "../utils/APIresponse.js";
import { OrgDoc } from "../models/orgdocter.js";

export const updateProfileOrg = async (req, res) => {
  const localPath = req?.files?.profilephoto[0]?.path;
  try {
    const decodedToken = decodedJWT(req.cookies.accessToken);
    const response = await uploadProfilePhoto(localPath, decodedToken.email);
    await OrgDoc.findByIdAndUpdate(
      decodedToken._id,
      { $set: { profilephoto: response } },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updated Succesfully"));
  } catch (error) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updatedation failed"));
  } finally {
    removeFile(localPath);
  }
};
