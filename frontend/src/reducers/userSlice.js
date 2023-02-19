import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logout: (state) => {},
    signup: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, signup } = userSlice.actions;

export default userSlice.reducer;
