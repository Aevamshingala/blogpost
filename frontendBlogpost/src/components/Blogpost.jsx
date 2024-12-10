import { useState, useEffect } from "react";
import { GetUser } from "./getUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Blogpost() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [succMess, setSuccMess] = useState("");
  const userdata = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const fetchUser = GetUser();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      message,
    };
    try {
      const response = await fetch(`http://localhost:3000/v1/blog/setblog`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setError(result.message);
      } else {
        setMessage("");
        setTitle("");
        setSuccMess(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const gotoBack = () => {
    navigate("/show");
  };

  return (
    <>
      <button
        onClick={gotoBack}
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Back
      </button>

      {userdata && (
        <>
          <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-8 w-96"
            >
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                {userdata?.userName} Submit Your Details
              </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full mt-2 py-3 px-4 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 font-medium focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
                className="w-full mt-4 py-3 px-4 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 font-medium focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="submit"
                value="Submit"
                className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              />
              <div className="w-full">
                {succMess && (
                  <div className="mt-2 p-2 bg-green-100 text-green-700 rounded w-full">
                    {succMess}
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
        </>
      )}
    </>
  );
}

export default Blogpost;
