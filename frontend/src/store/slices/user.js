import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: 0,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      sessionStorage.setItem("authToken", null);
      sessionStorage.setItem("authTokenTimestamp", null);
    },
  },
});

export const { setToken, setUser,logout } = userSlice.actions;

export default userSlice.reducer;
