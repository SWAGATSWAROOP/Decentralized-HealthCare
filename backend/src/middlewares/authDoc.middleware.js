import jwt from "jsonwebtoken";
import { OrgDoc } from "../models/orgdocter.js";

export const verifyDoc = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("UnAuthorized Access");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await OrgDoc.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error("User is not there Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Invalid Access Token");
    return res.status(401).json("Invalid Access Token");
  }
};
