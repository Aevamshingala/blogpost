import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../authServices/authslice.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let timeOut;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await fetch(`http://localhost:3000/v1/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "an unexpected error in login");
      } else {
        setError("");
        setEmail("");
        setPassword("");

        dispatch(login(result.data));
        setMessage(result.message);
        if (result.success) {
          timeOut = setTimeout(() => {
            navigate("/show");
          }, 1000);
        }
      }
    } catch (error) {
      setError(error.message || "some error happened in login");
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <div className="bg-blue-100 flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login Your Account
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full mt-4 py-3 px-4 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 font-medium focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full mt-4 py-3 px-4 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 font-medium focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="submit"
          value="Login"
          className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        />
        <div className="w-full">
          {message && (
            <div className="mt-2 p-2 bg-green-100 text-green-700 rounded w-full">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded w-full">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
