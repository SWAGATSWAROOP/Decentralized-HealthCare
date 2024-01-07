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
    const { username, name, phoneno, email } = req.body;

    const updateduser = await User.findOneAndUpdate(
      { username },
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
