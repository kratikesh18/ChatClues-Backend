import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "The above Fields cannnot be empty! ");
  }

  const userDoExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userDoExist) {
    throw new ApiError(
      406,
      "User with this Email or username is already exist "
    );
  }

  const user = await User.create({
    email: email,
    password: password,
    username: username,
  });

  const userToSend = await User.findById(user._id).select("-password");
  const accessToken = await user.genrateAccessToken();

  return res
    .status(200)
    .cookie("token", accessToken)
    .json(new ApiResponse(200, userToSend, "user created successfully "));
});

export { registerUser };
