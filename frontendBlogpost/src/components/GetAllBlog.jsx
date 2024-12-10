import React, { useState } from "react";
import { GetUser } from "./getUser.jsx";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

function GetAllBlog() {
  const fetchUser = GetUser();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [alldata, setAllData] = useState([{}]);
  const navigate = useNavigate();
  const result = useLoaderData();

  useEffect(() => {
    fetchUser();

    if (!result.success) {
      setError(result.message || "an unexpected error in login");
    } else {
      setError("");
      setMessage(result.message);
      setAllData(result.data);
    }
  }, []);

  const gotoBack = () => {
    navigate("/show");
  };

  return (
    <>
      <button
        onClick={gotoBack}
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-4"
      >
        Back
      </button>
      <div className="flex justify-center items-center min-h-screen bg-slate-800">
        <div className="max-w-3xl w-full p-6 bg-slate-500 rounded-lg shadow-md m-4">
          {/* Blog Post List */}
          {alldata && alldata.length > 0 ? (
            alldata.map(({ title, message, owner }) => (
              <div
                key={nanoid()}
                className="mb-6 border border-gray-200 bg-gray-50 rounded-lg shadow-sm overflow-hidden"
              >
                {/* Blog Post Content */}
                <div className="p-6">
                  {/* Owner Information */}
                  <p className="text-sm text-gray-600 mb-2">
                    By{" "}
                    <span className="font-medium">
                      {owner?.userName || "Anonymous"}
                    </span>
                  </p>

                  {/* Blog Title */}
                  <div className="bg-slate-200 px-6 py-2 rounded-lg mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {title}
                    </h2>
                  </div>

                  {/* Blog Message */}
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
            {message && alldata.length > 0 && (
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
      </div>
    </>
  );
}

export default GetAllBlog;
export const getAlldata = async () => {
  const response = await fetch(`http://localhost:3000/v1/blog/getallblog`, {
    method: "POST",
    credentials: "include",
  });
  return await response.json();
};
