import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

// Thunks para acciones asíncronas
export const getPosts = createAsyncThunk('posts/getPosts', async (_, thunkAPI) => {
  try {
    return await postsService.getPosts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getById = createAsyncThunk('posts/getById', async (postId, thunkAPI) => {
  try {
    return await postsService.getPostById(postId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getUserPosts = createAsyncThunk('posts/getUserPosts', async (userId, thunkAPI) => {
  try {
    return await postsService.getUserPosts(userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (postId, thunkAPI) => {
  try {
    return await postsService.likePost(postId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const unlikePost = createAsyncThunk('posts/unlikePost', async (postId, thunkAPI) => {
  try {
    return await postsService.unlikePost(postId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, thunkAPI) => {
  try {
    return await postsService.createPost(postData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, thunkAPI) => {
  try {
    return await postsService.deletePost(postId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Estado inicial
const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  error: null,
};

// Slice de Redux
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePostLikes: (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      if (state.post && state.post._id === updatedPost._id) {
        state.post = updatedPost;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        if (state.post && state.post._id === updatedPost._id) {
          state.post = updatedPost;
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        if (state.post && state.post._id === updatedPost._id) {
          state.post = updatedPost;
        }
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

// Exportar las acciones necesarias
export const { updatePostLikes } = postsSlice.actions;
export { getPosts as getAll}; 
export default postsSlice.reducer;