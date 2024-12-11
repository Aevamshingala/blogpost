import React, { useState } from "react";
import { GetUser } from "./getUser.jsx";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { url } from "../const.js";

function MyBlog() {
  const fetchUser = GetUser();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [Mydata, setMyData] = useState([{}]);

  const getdata = async () => {
    try {
      const response = await fetch(`${url}v1/blog/myblog`, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "an unexpected error in login");
      } else {
        setError("");
        setMessage(result.message);
        setMyData(result.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getdata();
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Blog Post Style Content */}
      {Mydata && Mydata.length > 0 ? (
        Mydata.map(({ title, message, owner }) => (
          <div
            key={nanoid()}
            className="mb-6 border border-gray-200 bg-gray-50 rounded-lg shadow-sm overflow-hidden"
          >
            {/* Content */}
            <div className="p-6">
              {/* Owner's Name */}
              <p className="text-sm text-gray-600 mb-2">
                By{" "}
                <span className="font-medium">
                  {owner?.userName || "Anonymous"}
                </span>
              </p>

              {/* Title */}
              <div className="bg-gray-200 px-6 py-2 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              </div>

              {/* Message */}
              <p className="text-base text-gray-700">{message}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-center">
          <p className="text-gray-700">No blog posts available.</p>
        </div>
      )}

      {/* Feedback Messages */}
      <div className="mt-6">
        {message && Mydata.length > 0 && (
          <div className="p-4 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 text-red-800 border border-red-200 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlog;
