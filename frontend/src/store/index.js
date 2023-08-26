import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { snakbarSlice } from "./slices/snakbar";

const rootReducer = {
  user: userSlice.reducer, // Access the reducer field of userSlice
  snakbar: snakbarSlice.reducer, //for snakbar alert
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
