import { User } from "../models/auth.js";
import ApiResponse from "../utils/APIresponse.js";

// get profile details
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id);
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
    const { name, phoneno, email } = req.body;

    const updateduser = await User.findOneAndUpdate(
      { email },
      { $set: { name, phoneno, email } },
      { new: true }
    ).select("-password -refreshToken");

    res
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
