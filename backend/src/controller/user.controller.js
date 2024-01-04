import { User } from "../models/auth.js";
import { ApiResponse } from "../utils/APIresponse.js";

export const registeruser = async (req, res) => {
  try {
    //get user detail
    const { username, password, name } = req.body;
    //Validation
    if ([username, password, name].some((field) => field.trim() === "")) {
      console.log("Some Fields Are empty");
    }
    //check if user always exist
    if (User.findOne(username)) {
      console.log("user alerady exist");
      throw new Error("User Already Exists");
    }

    //Now Create the user
    const user = await User.create({
      name,
      username: username.toLowerCase(),
      password,
    });
  } catch (err) {
    console.log("Error in registering the user");
  }

  //Check if user exists and also takeout all field except password and refresh refreshToken
  const createdUser = User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    console.log("User is not created Successfully");
    throw new Error("User is not created Successfully");
  }

  //Return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Succesfully"));
};
