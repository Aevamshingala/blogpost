import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../authServices/authslice.js";

function Firstpage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  let timeOut;

  const handleClick = async () => {
    //check user exist
    const responce = await fetch(
      `http://localhost:3000/v1/user/getcurrentuser`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const result = await responce.json();
    if (!responce.ok) {
      navigate("/register");
    } else {
      dispatch(login(result.data));
      setUser(result.data.userName);
      timeOut = setTimeout(() => {
        navigate("/show");
      }, 2000);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {(user && (
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {" "}
          Welcome {user}
        </h1>
      )) || <h1 className="text-4xl font-bold text-gray-800 mb-6"> Welcome</h1>}
      <button
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleClick}
      >
        Get Started
      </button>
    </div>
  );
}

export default Firstpage;
