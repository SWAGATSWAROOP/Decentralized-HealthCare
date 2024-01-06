import { User } from "../models/auth.js";
import { ApiResponse } from "../utils/APIresponse.js";

const generateAccessTokenAndRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    //No need to validate paswword and all before saving
    await user.save({ validateBeforeSave: false });
    //Returning the refresh and access token
    return { refreshToken, accessToken };
  } catch (err) {
    throw new Error(
      "Something went wrong while generating Access And Refresh Token"
    );
  }
};

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
  const { username, email, password } = req.body;

  //check if username is there
  if (!password && (!username || !email)) {
    throw new Error("Provide the username or Email");
  }

  //Find user in the DB
  const user = await User.findOne({ $or: [{ username }, { email }] });

  //If user is not found
  if (!user) {
    throw new Error("User is not there in DB");
  }

  //This isPasswordCorrect is not availabe on User Scehma it avilabe in the DB instance
  const checkPassword = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new Error("password is not correct");
  }

  //Now generateAccessTokenAndRefreshToken
  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  // We have to use loggedinUser because we have reference of user without refreshToken therefore we have to do it
  const loggedinUser = User.findById(user._id).select(
    "-password -refreshToken"
  );

  //Option for cookies these both options make cookies updatable only from server side and not from frontend side
  const options = {
    httpOnly: true,
    secure: true,
  };

  // We are sending data in cookies but also in response because lets say the user want to save the cookies in local storage or moblie application where cookies will be not be set
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedinUser, accessToken, refreshToken },
        "User Logged in Succesfully"
      )
    );
};

//Logout user
export const logOutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      // Setting new as true because in response we want updated value without RefreshToken nor old value will be returned
      new: true,
    }
  );

  //Option for cookies these both options make cookies updatable only from server side and not from frontend side
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logout Succesfully"));
};
