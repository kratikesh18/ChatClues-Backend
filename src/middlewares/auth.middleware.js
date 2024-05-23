import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";


const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      (req.cookies && req.cookies.token) ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      console.log("Token NOt fond Error");
      throw new ApiError(401, "Token NOT Found");
    }

    const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedInfo) {
      throw new ApiError(401, "Token Unverified");
    }

    const user = await User.findById(decodedInfo?._id);
    if (!user) {
      throw new ApiError(405, "User not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("\t\tThwoin Error From here ");
    throw new ApiError(408, error?.message || "Token verification failed");
  }
});

export { verifyJwt };
