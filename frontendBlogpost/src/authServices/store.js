import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authslice.js";
const store = configureStore({
  reducer: authreducer,
});

export default store;
