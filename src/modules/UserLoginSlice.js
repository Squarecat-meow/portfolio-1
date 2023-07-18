import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const UserLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    upLogin(state, action) {
      return (state = action.payload);
    },
  },
});

export const { upLogin } = UserLoginSlice.actions;

export default UserLoginSlice.reducer;
