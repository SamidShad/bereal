import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showComment: false,
};

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    showCommentFunc: (state, action) => {
      state.showComment = action.payload;
    },
  },
});

export const { showCommentFunc } = commentSlice.actions;

export default commentSlice.reducer;
