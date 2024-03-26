import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Post, ReturnedPost } from '../../types';
import { transformPost } from '../../helpers/transformPost';

type PostsState = {
  posts: Post[];
  currentPost: Post | null;
  searchTerm: string;
  isLoading: boolean;
  likedPosts: number[];
  dislikedPosts: number[];
};

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  searchTerm: '',
  isLoading: false,
  likedPosts: [],
  dislikedPosts: [],
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (searchTerm: string) => {
  let url = 'https://jsonplaceholder.typicode.com/posts';

  if (searchTerm.trim() !== '') {
    url = `https://jsonplaceholder.typicode.com/posts?title=${searchTerm}`;
  }

  const response = await axios.get<ReturnedPost[]>(url);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id: number) => {
  const response = await axios.get<ReturnedPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const alreadyLiked = state.likedPosts.includes(id);
      const alreadyDisliked = state.dislikedPosts.includes(id);

      return {
        ...state,
        likedPosts: alreadyLiked ? state.likedPosts.filter((postId) => postId !== id) : [...state.likedPosts, id],
        dislikedPosts: alreadyLiked ? state.dislikedPosts : state.dislikedPosts.filter((postId) => postId !== id),
        posts: state.posts.map((item) =>
          item.id === id
            ? {
                ...item,
                likes: alreadyLiked ? item.likes - 1 : item.likes + 1,
                dislikes: alreadyDisliked ? item.dislikes - 1 : item.dislikes,
              }
            : item,
        ),
      };
    },

    toggleDislike: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const alreadyDisliked = state.dislikedPosts.includes(id);
      const alreadyLiked = state.likedPosts.includes(id);

      return {
        ...state,
        dislikedPosts: alreadyDisliked
          ? state.dislikedPosts.filter((postId) => postId !== id)
          : [...state.dislikedPosts, id],
        likedPosts: alreadyDisliked ? state.likedPosts : state.likedPosts.filter((postId) => postId !== id),
        posts: state.posts.map((item) =>
          item.id === id
            ? {
                ...item,
                dislikes: alreadyDisliked ? item.dislikes - 1 : item.dislikes + 1,
                likes: alreadyLiked ? item.likes - 1 : item.likes,
              }
            : item,
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((item) => transformPost(item));
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        const existingPostIndex = state.posts.findIndex((post) => post.id === action.payload.id);
        const { id, title, body } = action.payload;

        if (existingPostIndex !== -1) {
          state.posts[existingPostIndex] = { ...{ id, title, body }, ...state.posts[existingPostIndex] };
        } else {
          state.posts.push(transformPost(action.payload));
        }
        state.isLoading = false;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const { setSearchTerm, toggleDislike, toggleLike } = postsSlice.actions;
