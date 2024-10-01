import { configureStore } from "@reduxjs/toolkit";
import postModalSlice from "./slices/postModalSlice";
import postArraySlice from "./slices/postArraySlice";
import exploreModeSlice from "./slices/exploreModeSlice";
import alertSlice from "./slices/alertSlice";
import tokenSlice from "./slices/tokenSlice";
import commentSlice from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    postModalSlice,
    postArraySlice,
    exploreModeSlice,
    commentSlice,
    alertSlice,
    tokenSlice,
  },
});
