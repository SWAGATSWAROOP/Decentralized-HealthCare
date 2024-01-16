import jwt from "jsonwebtoken";

export const decodedJWT = (accessToken) =>
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

export const decodeHeader = (token) =>
  jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);
