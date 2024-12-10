import { Router } from "express";
import {
  getAllBlog,
  getMyBlog,
  setBlog,
} from "../controller/blog.controller.js";
import { verifyJwt } from "../middlewares/jwt.middleware.js";

const router = Router();

router.post("/post", (req, res) => {
  res.send("POST request to the homepage");
});

router.route("/setblog").post(verifyJwt, setBlog);
router.route("/getallblog").post(verifyJwt, getAllBlog);
router.route("/myblog").post(verifyJwt, getMyBlog);

export default router;
