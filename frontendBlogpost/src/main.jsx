import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Register from "./components/Register.jsx";
import Blogpost from "./components/Blogpost.jsx";
import Login from "./components/Login.jsx";
import Show from "./components/Shows.jsx";
import Firstpage from "./components/Firstpage.jsx";
import { Provider } from "react-redux";
import store from "../src/authServices/store.js";
import GetAllBlog, { getAlldata } from "./components/GetAllBlog.jsx";
import { NotFound } from "../components/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Firstpage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogpost" element={<Blogpost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/show" element={<Show />} />
      <Route path="*" element={<NotFound />} />
      <Route loader={getAlldata} path="/getallblog" element={<GetAllBlog />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
