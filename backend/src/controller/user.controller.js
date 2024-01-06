import { User } from "../models/auth.js";
import { ApiResponse } from "../utils/APIresponse.js";

//Registerng the user
export const registeruser = async (req, res) => {
  try {
    //get user detail
    const { username, password, name, email, phoneno } = req.body;
    //Validation
    if (
      [username, password, name, email, phoneno].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new Error("Some Fields Are empty");
    }
    //check if user always exist
    const fuser = await User.findOne({ $or: [{ username }, { email }] });
    if (fuser) {
      console.log("user alerady exist");
      throw new Error("User Already Exists");
    }
    //Now Create the user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      phoneno,
    });

    //Check if user exists and also takeout all field except password and refresh refreshToken
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      console.log("User is not created Successfully");
      throw new Error("User is not created Successfully");
    }

    //Return response
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Registered Succesfully"));
  } catch (err) {
    console.log("Error in registering the user");
  }
};

//Login User
export const loginUser = async (req, res) => {
  //get data from request body
  const { username, password } = req.body;

  //check if username is there
  if (!username || !password) throw new Error("Provide the username or Email");
};
