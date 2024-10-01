import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: true,
  posts: false,
  loading: false,
};

export const exploreModeSlice = createSlice({
  name: "exploreModeSlice",
  initialState,
  reducers: {
    updateThreads: (state, action) => {
      state.threads = action.payload;
    },
    updatePosts: (state, action) => {
      state.posts = action.payload;
    },
    PostsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updatePosts, updateThreads, PostsLoading } =
  exploreModeSlice.actions;

export default exploreModeSlice.reducer;
