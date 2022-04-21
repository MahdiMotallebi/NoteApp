import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../component/feature/slice";

export const store = configureStore({
  reducer: {
    noteReducer,
  },
});
