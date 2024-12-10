// const { Schema, default: mongoose, Types } = require("mongoose");
import { Schema } from "mongoose";
import mongoose from "mongoose";

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const blogPost = mongoose.model("blogPost", blogPostSchema);
