import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./inititalState";

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
});

export const { addCurrentVideo } = filtersSlice.actions;
export default filtersSlice.reducer;
