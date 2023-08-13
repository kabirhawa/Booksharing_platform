import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";

const rootReducer = {
  user: userSlice.reducer, // Access the reducer field of userSlice
  // Add other reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
