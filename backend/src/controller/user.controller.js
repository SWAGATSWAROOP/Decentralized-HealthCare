import { User } from "../models/auth.js";
import ApiResponse from "../utils/APIresponse.js";
import axios from "axios";
import { uploadProfilePhoto } from "../utils/Cloudinary.js";
import { options } from "../utils/cookieOptions.js";
import { removeFile } from "../utils/unlinkFile.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

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
    console.log("Cannot geneate Access or Refresh Token");
  }
};

//Registerng the user
export const registeruser = async (req, res) => {
  // Checking ProfilePhoto
  // Mutler gives access to req.files?.profilephoto
  let profilePhotoPath = req.files?.profilephoto[0]?.path;
  try {
    //get user detail
    let { password, name, email, phoneno } = req.body;
    //Validation
    if ([password, name, email, phoneno].some((field) => field.trim() === "")) {
      console.log("Some fiels are empty");
      return res.status(401).json({ message: "Some fields are empty" });
    }
    email = email.toLowerCase();
    //check if user always exist
    const fuser = await User.findOne({ email });
    if (fuser) {
      console.log("user alerady exist");
      return res.status(401).json({ message: "User alerady exists" });
    }

    let profilePhoto = "";
    if (profilePhotoPath) {
      try {
        profilePhoto = await uploadProfilePhoto(profilePhotoPath, email);
      } catch (error) {
        console.log("Error in uploading");
      }
    }

    //Now Create the user
    const user = await User.create({
      name,
      email,
      password,
      phoneno,
      profilephoto: profilePhoto || "",
    });

    //Check if user exists and also takeout all field except password and refresh refreshToken
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      console.log("User is not created Successfully");
      return res.status(401).json({ message: "User is not created" });
    }

    //Return response
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Registered Succesfully"));
  } catch (err) {
    console.log("Error in registering the user");
  } finally {
    removeFile(profilePhotoPath);
  }
};

//Login User
export const loginUser = async (req, res) => {
  //get data from request body
  const { email, password } = req.body;

  //check if email is there
  if (!email) {
    console.log("Provide the  Email");
    return res.status(401).json({ message: " Email is not Provided" });
  }

  //Find user in the DB
  const user = await User.findOne({ email });

  //If user is not found
  if (!user) {
    console.log("User is not there in DB");
    return res.status(401).json({ message: "User is not created" });
  }

  //This isPasswordCorrect is not availabe on User Scehma it avilabe in the DB instance
  const checkPassword = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    console.log("password is not correct");
    return res.status(401).json({ message: "Password is not correct" });
  }

  //Now generateAccessTokenAndRefreshToken
  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  // We have to use loggedinUser because we have reference of user without refreshToken therefore we have to do it
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //We have to takeout the response because the circular object call in which the object calls itself
  // We are sending data in cookies but also in response because lets say the user want to save the cookies in local storage or moblie application where cookies will be not be set
  const responseData = {
    user: loggedinUser,
    accessToken,
    refreshToken,
  };

  // Send this responseData as part of the response
  return res
    .status(200)
    .cookie("userid", user._id, options)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, responseData, "User Logged in Successfully"));
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

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .clearCookie("userid", options)
    .json(new ApiResponse(200, {}, "User Logout Succesfully"));
};

export const refreshAccesstoken = async (req, res) => {
  try {
    //getting refresh token from cookies and for mobile devices request body
    const incomingRT = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRT) {
      console.log("Refresh Token is not present or wrong");
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedtoken = jwt.verify(
      incomingRT,
      process.env.REFRESH_TOKEN_SECRET
    );

    //Find out user in DB as we have stored _id while generting Refresh Token
    const user = await User.findById(decodedtoken._id);
    if (!user) {
      console.log("User is not present");
      return res.status(401).json("User is not present");
    }

    if (user?.refreshToken !== incomingRT) {
      console.log("Refresh Token Doesn't Match");
      return res.status(401).json({ message: "Refresh Token is used" });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          { accessToken, refreshToken },
          "Succesfully Regenerated Access and refreshToken"
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Something went wrong while refreshing access Token" });
  }
};

//Handling google sign
export const googleSignIn = async (req, res) => {
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "postmessage"
    );

    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    const { access_token, refresh_token } = tokens;

    // Use the access_token to fetch user data from Google's API
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { name, email, sub, picture } = userInfoResponse.data;

    // Checking if user exist in DB
    const ifexist = await User.findOne({ email }).select(
      "-password -refreshtoken"
    );

    if (ifexist) {
      console.log("User already signed in");
      return res
        .status(201)
        .json(new ApiResponse(201, { user: ifexist }, "User already exist"));
    }

    // Create User if dont exist
    const user = await User.create({
      name: name,
      email: email,
      refreshToken: refresh_token,
      phoneno: "",
      profilephoto: picture,
      password: sub,
      type: false,
    }).select("-password -refresh_token");

    // Redirect or respond with success
    return res
      .status(200)
      .cookie("userid", user._id, options)
      .cookie("accessToken", access_token, options)
      .cookie("refreshToken", refresh_token, options)
      .json(
        new ApiResponse(
          200,
          { user, accessToken: access_token, refreshToken: refresh_token },
          "Authentication successful"
        )
      );
  } catch (error) {
    // Handle error
    res.status(500).json(new ApiResponse(500, {}, "Authentication failed"));
  }
};
