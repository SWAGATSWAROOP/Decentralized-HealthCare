import { User } from "../models/auth.js";
import ApiResponse from "../utils/APIresponse.js";
import { decodedJWT } from "../utils/deCodeToken.js";

// get profile details
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User Not found"));
    }
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user,
        },
        "Fetched data Succesfully"
      )
    );
  } catch (error) {
    console.log("Error while fetching the data");
    res.status(500).json(new ApiResponse(500, {}, "Server Error"));
  }
};

//update profile details
export const updateProfile = async (req, res) => {
  try {
    const { name, phoneno } = req.body;
    const decodedToken = decodedJWT(req.cookies.accessToken);

    const email = decodedToken.email;

    const updateduser = await User.findOneAndUpdate(
      { email },
      { $set: { name, phoneno } },
      { new: true }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .json(new ApiResponse(200, { user: updateduser }, "Updated Succesfully"));
  } catch (error) {
    console.log("Error in updating the value");
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Something went wrong"));
  }
};

//forget password or change password
export const updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user.type) {
      return res.status(400).json(new ApiResponse(400, {}, "Not Authorized"));
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      console.log("Password Doesnot Match");
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password is not correct"));
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updated Password Succesfully"));
  } catch (error) {
    console.log("Something Went wrong while changing password");
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal server error"));
  }
};
