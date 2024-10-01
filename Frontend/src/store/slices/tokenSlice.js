import { createSlice } from "@reduxjs/toolkit";

const storedUserData = JSON.parse(localStorage.getItem("userToken"));
const initialState = {
  token: storedUserData?.token || null,
  userName: storedUserData?.userName || null,
  realToken: storedUserData?.token?.token || null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.realToken = action.payload.realToken;

      if (action.payload.token) {
        const userData = {
          token: action.payload.token,
          userName: action.payload.userName,
          realToken: action.payload.realToken,
        };
        localStorage.setItem("userToken", JSON.stringify(userData));
      } else {
        localStorage.removeItem("userToken");
      }
    },
    removeToken: (state) => {
      state.token = null;
      state.userName = null;
      state.realToken = null;
      localStorage.removeItem("userToken");
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
