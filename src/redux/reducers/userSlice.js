import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = actiogin.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
