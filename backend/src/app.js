import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "https://blogpost-frontend-ga4n.onrender.com",
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

export default app;
