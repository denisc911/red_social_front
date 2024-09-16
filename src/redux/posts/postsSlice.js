import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
};

export const getAll = createAsyncThunk('posts/getAll', async () => {
  return await postsService.getAll();
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
