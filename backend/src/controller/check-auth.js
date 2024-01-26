import ApiResponse from "../utils/APIresponse.js";
import { decodedJWT } from "../utils/deCodeToken.js";

const checkAuth = (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const token = decodedJWT(accessToken);
    console.log(token);
    if (token) {
      return res.status(200).json(new ApiResponse(200, {}, "Valid Token"));
    }
    return res.status(400).json(new ApiResponse(400, {}, "Invalid Token"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Server Error"));
  }
};

export default checkAuth;
