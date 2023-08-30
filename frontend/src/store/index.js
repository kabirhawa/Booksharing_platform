import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { snakbarSlice } from "./slices/snakbar";
import { bookSlice } from "./slices/book";

const rootReducer = {
  user: userSlice.reducer, // Access the reducer field of userSlice
  snakbar: snakbarSlice.reducer, //for snakbar alert
  books: bookSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
