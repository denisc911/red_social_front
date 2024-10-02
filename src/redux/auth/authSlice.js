import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // Cambia a true cuando el usuario inicie sesión
  // Otros estados...
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true; // Cambia este valor según tu lógica de inicio de sesión
    },
    logout(state) {
      state.isAuthenticated = false; // Cambia este valor según tu lógica de cierre de sesión
    },
    // Otros reducers...
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
