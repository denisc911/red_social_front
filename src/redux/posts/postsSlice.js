import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService'; // Importa correctamente el servicio de posts

// Acción asíncrona para crear un post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, thunkAPI) => {
    try {
      const response = await postsService.create(postData); // Utiliza el servicio de creación de post
      return response; // Devuelve el post creado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Manejo de errores
    }
  }
);

// Acción asíncrona para obtener todos los posts
export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, thunkAPI) => {
    try {
      const response = await postsService.getAll(); // Llama al servicio que obtiene todos los posts
      return response; // Retorna los posts
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Manejo de errores
    }
  }
);

// Definición del slice para posts
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer para manejar cualquier lógica adicional (por ejemplo, borrar posts)
  },
  extraReducers: (builder) => {
    builder
      // Crear post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload); // Agrega el nuevo post a la lista de posts
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error en el estado
      })
      // Obtener todos los posts
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; // Actualiza el estado con los posts obtenidos
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Manejo de error
      });
  },
});

export default postsSlice.reducer;
