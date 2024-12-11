import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
const dirName = path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(cookieParser());

import blogrouter from "../routers/blog.router.js";
app.use("/v1/blog", blogrouter);

import userrouter from "../routers/user.router.js";
app.use("/v1/user", userrouter);

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500; // Default to 500 if no status code is set
  res.status(statusCode).json({
    success: err.success,
    message: err.message || "Internal Server Error", // This will be the error message
    errors: err.errors || [], // Any additional errors (optional)
  });
});

app.use(express.static(path.join(dirName, "/frontendBlogpost/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(dirName, "frontendBlogpost", "dist", "index.html"));
});
export default app;
