import { Apierror } from "../error/apierror.js";
import { ApiResponce } from "../apiResponce/apiResponce.js";
import bcrypt from "bcrypt";
import { User } from "../model/register.js";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Apierror(
      500,
      "some thing went wrong while genarating refresh and access token"
    );
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      throw new Apierror(300, "Email is not valid", false);
    }

    // Check if user already exists (either by username or email)
    const existUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existUser) {
      // If the user already exists, throw an Apierror with code 1200
      throw new Apierror(400, "User already exists", false);
    }

    // Create new user
    const user = await User.create({ userName, password, email });
    return res
      .status(200)
      .json(new ApiResponce(200, "user create successfully", true));
  } catch (error) {
    // Pass any error to the next middleware (Express error handler)
    next(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      throw new Apierror(400, "email and password are required", false);
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      throw new Apierror(404, "user does not exist", false);
    }

    const isPasswordValid = await existUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new Apierror(401, "password is not correct", false);
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      existUser?._id
    );

    const loggedInUser = await User.findById(existUser._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure:true, // Secure only for production
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponce(200, "user Logged in successfully", true, loggedInUser)
      );
  } catch (error) {
    next(error);
  }
};

const changepassword = async (req, res, next) => {
  try {
    const { email, password, newpassword } = req.body;

    const user = await User.findOne({ email });

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new Apierror(400, "your password is wrong");
    }
    // const hashpasss = await bcrypt.hash(newpassword, 10);
    // const setnewpass = await User.findByIdAndUpdate(user._id, {
    //   password: hashpasss,
    // });
    // await user.save(); //it save without this
    user.password = newpassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponce(200, "password change success fully", true));
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true , // Secure only for production
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponce(200, "user logOut successfully", true));
  } catch (error) {
    next();
  }
};
const getCurrentUser = async (req, res, next) => {
  const user = await req.user;
  return res
    .status(200)
    .json(new ApiResponce(200, "user fetched successfully", true, user));
};

export { registerUser, Login, changepassword, logOut, getCurrentUser };
