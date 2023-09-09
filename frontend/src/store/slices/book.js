import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "user",
  initialState: {
    AllBooks: "",
    MyBooks: null,
    searchBooks: [],
    searching: true,
  },
  reducers: {
    setAllBooks: (state, action) => {
      state.AllBooks = action.payload;
    },
    setMyBooks: (state, action) => {
      state.MyBooks = action.payload;
    },
    setSearchBooks: (state, action) => {
      state.searchBooks = action.payload;
    },
    setSearching: (state, action) => {
      state.searching = action.payload;
    },
  },
});

export const { setAllBooks, setMyBooks, setSearchBooks, setSearching } =
  bookSlice.actions;

export default bookSlice.reducer;
