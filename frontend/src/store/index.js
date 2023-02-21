import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/loginSlice";
import signupSlice from "../reducers/signupSlice";

export default configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
  },
});
