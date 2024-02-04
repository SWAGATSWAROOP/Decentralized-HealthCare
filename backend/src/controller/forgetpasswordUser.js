// email -> received
// find email in db
// sent a random otp - 6digit
// check correctness
// nextpage reset password
// newpass
//confirmpass
// updated

import jwt from "jsonwebtoken";
import { User } from "../models/auth.js";
import ApiResponse from "../utils/APIresponse.js";
import { genearateOTP } from "../utils/OTP.js";
import { sendMail } from "../utils/nodemailer.js";
import { decodeHeader } from "../utils/deCodeToken.js";

export const forgetPasswordUser = async (req, res) => {
  try {
    let email = req.body?.email;
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user || !user.type) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "User doesnot Exist"));
    }
    const genOTP = genearateOTP();
    const token = jwt.sign(
      { userid: user._id, genOTP },
      process.env.FORGOT_PASSWORD_SECRET,
      {
        expiresIn: "3m",
      }
    );
    console.log(req.body);
    const mail = await sendMail(email, genOTP);
    if (!mail) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Unable to sent mail"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { token }, "Mail received Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Unable to verify"));
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const token = req.headers.authorization || req.body;
    if (!token) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Token not present"));
    }

    const { userid, genOTP } = decodeHeader(token);
    if (otp != genOTP) {
      console.log("otp doesnot match");
      return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
    }
    const user = await User.findById(userid);
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User is not found"));
    }
    user.password = password;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updated Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Unable to verify"));
  }
};
