import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  isActive: false,
  mode: "create",
  currentPost: null,
};

export const postModalSlice = createSlice({
  name: "postModalSlice",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.id = action.payload.id || null;
      state.isActive = action.payload.isActive || false;
      state.mode = action.payload.mode || "Create a post";
      state.currentPost = action.payload.currentPost || null;
    },
  },
});

export const { updateData } = postModalSlice.actions;

export default postModalSlice.reducer;
