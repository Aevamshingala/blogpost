import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../const";

function Register() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let timeOut;

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { userName, email, password };
    try {
      const response = await fetch(`${url}v1/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // If response is not ok, display the error message from the backend
        setError(result.message || "An unexpected error occurred");
      } else {
        // If registration is successful, display success message
        setError("");
        setMessage(result.message || "Registration successful");
        setuserName("");
        setEmail("");
        setPassword("");
        timeOut = setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      // If there's a network error or other issues, handle them here
      setError(error.message || "Failed to connect to the server");
    }
  }

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
          Register Your Account
        </h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          placeholder="Enter userName"
          className="w-full mt-2 py-3 px-4 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 font-medium focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
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
          value="Register"
          className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        />
        <p className="text-sm text-center text-blue-500 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
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

export default Register;
