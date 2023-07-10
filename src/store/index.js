import { configureStore } from "@reduxjs/toolkit";
import degreeSlice from "./degreeSlice";
import layoutSlice from "./layoutSlice";

const store = configureStore({
  reducer: { degree: degreeSlice.reducer, layout: layoutSlice.reducer },
});

export default store;
