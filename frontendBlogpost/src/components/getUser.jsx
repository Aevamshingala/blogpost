import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../authServices/authslice.js";
import { url } from "../const.js";
export const GetUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const responce = await fetch(`${url}v1/user/getcurrentuser`, {
        method: "POST",
        credentials: "include",
      });
      const result = await responce.json();

      if (!responce.ok) {
        navigate("/login");
      } else {
        dispatch(login(result.data));
      }
    } catch (error) {
      navigate("/login");
    }
  };
  return fetchUser;
};
