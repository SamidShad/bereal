import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const postArraySlice = createSlice({
  name: "postModalSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.push(action.payload);
    },
    addAllData: (state, action) => {
      return action.payload;
    },
    deleteData: (state, action) => {
      return state.filter((value) => value._id !== action.payload);
    },
    updateArrayData: (state, action) => {
      const { id, contentData } = action.payload;
      return state.map((post) => (post._id === id ? contentData : post));
    },
    updateLikeData: (state, action) => {
      const { id, updatedLikes } = action.payload;
      const post = state.find((post) => post._id === id);
      if (post) {
        post.like = updatedLikes;
      }
    },
  },
});

export const {
  addAllData,
  setData,
  deleteData,
  updateArrayData,
  updateLikeData,
} = postArraySlice.actions;

export default postArraySlice.reducer;
