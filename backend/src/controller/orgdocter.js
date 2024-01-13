import dotenv from "dotenv";
dotenv.config();
import { OrgDoc } from "../models/orgdocter.js";
import ApiResponse from "../utils/APIresponse.js";
import { uploadProfilePhoto } from "../utils/Cloudinary.js";
import { removeFile } from "../utils/unlinkfileafterupload.js";

// register the user
export const registerOrg = async (req, res) => {
  try {
    // check that if user sent all details
    const { email, password, name, phoneno, address, type } = req.body;

    // check if all fiels are present or not
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

    //check if the user already exists
    const ifExist = await OrgDoc.findOne({ email: email });

    if (ifExist) {
      console.log("User already exists");
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User already exists"));
    }

    //check if profile photo exist or logo
    const profilePhotopath = req.files?.profilephoto[0]?.path;
    if (!profilePhotopath) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Provide Logo/Photo"));
    }

    //upload to Cloudinary
    const response = await uploadProfilePhoto(profilePhotopath);
    if (!response) {
      return res.status(500).json(new ApiResponse(400, {}, "Unable to upload"));
    }

    //   remove files
    removeFile(profilePhotopath);

    // Creating the user
    const user = await OrgDoc.create({
      email,
      password,
      address,
      type,
      profilephoto: response.url,
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
  }
};

// Login the user
