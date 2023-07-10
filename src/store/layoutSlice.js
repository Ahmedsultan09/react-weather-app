import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearch: false,
  isForecast: true,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setDataPanel(state, action) {
      state.isForecast = true;
      state.isSearch = false;
    },
    setSearch(state, action) {
      state.isForecast = false;
      state.isSearch = true;
    },
  },
});
export const layoutActions = layoutSlice.actions;
export default layoutSlice;
