import { OrgDoc } from "../models/orgdocter.js";
import ApiResponse from "../utils/APIresponse.js";
import { uploadProfilePhoto } from "../utils/Cloudinary.js";
import { options } from "../utils/cookieOptions.js";
import { removeFile } from "../utils/unlinkFile.js";
import { decodedJWT } from "../utils/deCodeToken.js";
import jwt from "jsonwebtoken";

// generating Access And refreshToken
const generateAccessAndRefreshToken = async (userid) => {
  try {
    // Check if userid exist;
    const user = await OrgDoc.findById(userid);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    // Not Checking the validation before save
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error in generating access and refresh token");
  }
};

// register the user
export const registerOrg = async (req, res) => {
  //check if profile photo exist or logo
  const profilePhotopath = req.files?.profilephoto[0]?.path;
  try {
    // check that if user sent all details
    let { email, password, name, phoneno, address, type } = req.body;
    // check if all fiels are present or not
    console.log(email, password, name, phoneno, address);
    if (
      [email, password, name, phoneno, address, type].some(
        (field) => field.trim() === ""
      )
    ) {
      console.log("Some fields are empty");
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Some fields are empty"));
    }
    email = email.toLowerCase();
    //check if the user already exists
    const ifExist = await OrgDoc.findOne({ email: email });

    if (ifExist) {
      console.log("User already exists");
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User already exists"));
    }

    if (!profilePhotopath) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Provide Logo/Photo"));
    }

    //upload to Cloudinary
    const response = await uploadProfilePhoto(profilePhotopath, email);
    if (!response) {
      return res.status(500).json(new ApiResponse(400, {}, "Unable to upload"));
    }

    // Creating the user
    const user = await OrgDoc.create({
      email,
      password,
      address,
      type,
      profilephoto: response,
      phoneno,
      name,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User registered Successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Cannot Register Org"));
  } finally {
    removeFile(profilePhotopath);
  }
};

// Login the user
export const loginOrg = async (req, res) => {
  try {
    // Checkif user exists
    const { email, password } = req.body;

    if (!email && !password)
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Give full details"));

    const user = await OrgDoc.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User Doesnot exist"));

    // If Exist check password
    const passwordCheck = await user.checkPassword(password);

    if (!passwordCheck) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Password Doesnot Match"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedinUser = await OrgDoc.findById(user._id).select(
      "-password -refreshToken"
    );

    const response = {
      user: loggedinUser,
      accessToken,
      refreshToken,
    };

    // Password Matches
    return res
      .status(200)
      .cookie("userid", user._id, options)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, response, "Successfully Logged In"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Cannot Logged In Successfully"));
  }
};

// Logout User
export const logOut = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(500).json(new ApiResponse(500, {}, "Something went wrong"));
    }

    await OrgDoc.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .clearCookie("userid", options)
      .json(new ApiResponse(200, {}, "Successfully Logged Out"));
  } catch (error) {
    console.log("UnAuthorized");
  }
};

// refresh accessToken
export const refreshAccessToken = async (req, res) => {
  try {
    const inrefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!inrefreshToken) {
      console.log("Refresh Token is not present or wrong");
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedtoken = jwt.verify(
      inrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await OrgDoc.findById(decodedtoken._id);

    if (!user) {
      console.log("User is not present");
      return res.status(401).json("User is not present");
    }

    if (user?.refreshToken !== inrefreshToken) {
      console.log("Refresh Token Doesn't Match");
      return res.status(401).json({ message: "Refresh Token is used" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

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

//get Profile of Org/OrgDoc
export const getProfileOrg = async (req, res) => {
  try {
    const decodedToken = decodedJWT(req.cookies.accessToken);
    const user = await OrgDoc.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Cannot find the user"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Successfully Fetched profile"));
  } catch (error) {
    console.log("Error in fetching the data");
    return res.status(500).json(new ApiResponse(500, {}, "Cannot fetch user"));
  }
};

//change details
export const updateDetails = async (req, res) => {
  try {
    const decodedToken = decodedJWT(req.cookies.accessToken);
    let { name, phoneno, address, type } = req.body;

    // check if all fiels are present or not
    if ([name, phoneno, address, type].some((field) => field.trim() === "")) {
      console.log("Some fields are empty");
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Some fields are empty"));
    }

    await OrgDoc.findByIdAndUpdate(
      decodedToken._id,
      {
        $set: {
          name,
          phoneno,
          address,
          type,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Successfully Updated"));
  } catch (error) {
    console.log("Error in updating values");
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Error in updating values"));
  }
};

//update password
export const updatePassword = async (req, res) => {
  try {
    const decodedToken = decodedJWT(req.cookies.accessToken);
    const { oldPassword, newPassword } = req.body;
    const user = await OrgDoc.findById(decodedToken._id);
    if (!user) {
      console.log("Error in fetching the data");
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Cannot fetch user"));
    }
    const checkPassword = await user.checkPassword(oldPassword);
    if (!checkPassword) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Password Doesnot Match"));
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated Succesfully"));
  } catch (error) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password Not updated"));
  }
};
