import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GetUser } from "./getUser.jsx";
import Logout from "./Logout.jsx";
import { useNavigate } from "react-router-dom";
import MyBlog from "./MyBlog.jsx";

function Show() {
  const fetchUser = GetUser();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);
  const gotoblog = () => {
    navigate("/getallblog");
  };
  const gotocreateBlog = () => {
    navigate("/blogpost");
  };
  const user = useSelector((state) => state.userData);
  const present = useSelector((state) => state.status);

  return (
    <>
      <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center py-10">
        {user ? (
          <>
            {/* User Info */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-semibold text-sky-300">
                Welcome, {user.userName || "User Not Found"}
              </h1>
              {!user.userName && (
                <p className="text-red-300 mt-2">
                  Please check your account details.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-x-4 mb-8">
              <button
                onClick={gotoblog}
                className="px-6 py-3 text-lg font-medium bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Show Blog
              </button>
              <button
                onClick={gotocreateBlog}
                className="px-6 py-3 text-lg font-medium bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              >
                Create Blog
              </button>
            </div>

            {/* Blog Component */}
            <div className="w-full max-w-4xl bg-slate-700 rounded-lg shadow-lg p-6">
              <MyBlog />
            </div>
          </>
        ) : (
          // Fallback for no user
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-300">No User Found</h2>
            <p className="mt-2 text-gray-300">
              Please log in to access your account and blogs.
            </p>
          </div>
        )}

        {/* Logout Button */}
        {present && (
          <div className="mt-10">
            <Logout />
          </div>
        )}
      </div>
    </>
  );
}

export default Show;
