import { User } from "../models/auth.js";
import ApiResponse from "../utils/APIresponse.js";

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
const updateProfile = (req,res)=>{
    
}
