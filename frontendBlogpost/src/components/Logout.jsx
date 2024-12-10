import React, { useState, useEffect } from "react";
import { logout } from "../authServices/authslice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let timeOut;
  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "an unexpected error in login");
      } else {
        setError("");
        dispatch(logout());
        timeOut = setTimeout(() => {
          if (result.success) {
            navigate("/login");
          }
        }, 2000);
      }
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <>
      <button
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="w-full">
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 rounded w-full">
            {error}
          </div>
        )}
      </div>
    </>
  );
}

export default Logout;
