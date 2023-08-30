import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "user",
  initialState: {
    AllBooks: "",
    MyBooks: null,
  },
  reducers: {
    setAllBooks: (state, action) => {
      state.AllBooks = action.payload;
    },
    setMyBooks: (state, action) => {
      state.MyBooks = action.payload;
    },
  },
});

export const { setAllBooks, setMyBooks } = bookSlice.actions;

export default bookSlice.reducer;
