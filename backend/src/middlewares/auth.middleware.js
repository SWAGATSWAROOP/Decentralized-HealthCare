import jwt from "jsonwebtoken";
import { User } from "../models/auth.js";

//As we are not using respose therefore we can use _
export const Verifyjwt = async (req, _, next) => {
  try {
    // We are using or for mobile application in which cookies are not there and information is sent in header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("UnAuthorized Access");
    }

    //Accessing data from jwt that were signed
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error("User is not there Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new Error(err?.message || "Invalid Access Token");
  }
};
