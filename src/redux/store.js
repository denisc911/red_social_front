import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice'; // Ajusta la ruta según tu estructura de archivos
import postReducer from './reducers/postSlice'; // Ajusta la ruta según tu estructura de archivos

// Configuración del store
export const store = configureStore({
  reducer: {
    user: userReducer, // Reducer para manejar estado del usuario
    post: postReducer, // Reducer para manejar estado de los posts
  },
});

export default store;
