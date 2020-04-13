import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

type FetchPostPayload = { page?: number };

const fetchPosts = createAsyncThunk(
  "post/fetch",
  async ({ page = 1 }: FetchPostPayload, thunkAPI) => {
    thunkAPI.dispatch(setLoading())
    const response = await axios.get(`http://192.168.1.36:3001/posts?_page${page}`);
    return response.data;
  }
)

export interface Post {
  author: {
    name: string;
    avatar: string;
  },
  likes: number;
  date: string;
  image: string;
}

const postSlice = createSlice({
  name: 'post',
  initialState: { posts: [], loading: false },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: {
    // @ts-ignore
    [fetchPosts.fulfilled]: (state, action) => {
      return { ...state, posts: action.payload, loading: false }
    },
    // @ts-ignore
    [fetchPosts.rejected]: (state) => {
      return { ...state, loading: false }
    }
  }
});

const { setLoading } = postSlice.actions;
export { fetchPosts };
export const postReducer = postSlice.reducer;
