import { blogPost } from "../model/schema.js";
import { Apierror } from "../error/apierror.js";
import { ApiResponce } from "../apiResponce/apiResponce.js";

const setBlog = async (req, res, next) => {
  const { title, message } = req.body;

  try {
    if (!title) throw new Apierror(401, "title not found", false);
    if (!message) throw new Apierror(401, "message not found", false);

    const user = await req.user;
    if (!user) {
      throw new Apierror(400, "user is not found in blogpost", false);
    }
    const createBlog = await blogPost.create({
      title,
      message,
      owner: user,
    });

    if (!createBlog) {
      throw new Apierror(401, "blog is not created", false);
    }
    return res
      .status(200)
      .json(new ApiResponce(200, "blog create successfully", true, user));
  } catch (error) {
    next(error);
  }
};

const getAllBlog = async (req, res, next) => {
  try {
    // const blog = await blogPost.find();
    const blog = await blogPost
      .find()
      .sort({ createdAt: -1 })
      .populate("owner", "userName");

    if (!blog) {
      throw new Apierror(400, "blog not found", false);
    }
    return res
      .status(200)
      .json(new ApiResponce(200, "blog fetch successfully", true, blog));
  } catch (error) {
    next(error);
  }
};

const getMyBlog = async (req, res, next) => {
  const userId = await req.user;

  const myblog = await blogPost
    .find({
      owner: userId._id,
    })
    .sort({ createdAt: -1 })
    .populate("owner", "userName");

  return res
    .status(200)
    .json(new ApiResponce(200, "my blog fetch successfully", true, myblog));
};

export { setBlog, getAllBlog, getMyBlog };
