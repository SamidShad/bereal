import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCardAlert: false,
};

export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    showCard: (state, action) => {
      state.showCardAlert = action.payload;
    },
  },
});

export const { showCard } = alertSlice.actions;

export default alertSlice.reducer;
