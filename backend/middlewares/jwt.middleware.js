import jwt from "jsonwebtoken";
import { Apierror } from "../error/apierror.js";
import { User } from "../model/register.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);

    if (!token) {
      throw new Apierror(401, "unauthorize request", false);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = User.findById(decodedToken?._id).select(
      "-password,-refreshToken"
    );

    if (!user) {
      throw new Apierror(400, "invalid accesstoken", false);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
