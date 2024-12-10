import { Router } from "express";
import {
  Login,
  registerUser,
  changepassword,
  logOut,
  getCurrentUser,
} from "../controller/user.controller.js";
import { verifyJwt } from "../middlewares/jwt.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/changepassword").post(changepassword);
router.route("/logout").post(verifyJwt, logOut);
router.route("/getcurrentuser").post(verifyJwt, getCurrentUser);
export default router;
