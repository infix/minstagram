import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const fetchPosts = createAsyncThunk(
  "post/fetch",
  async (args, thunkAPI) => {
    const { post } = thunkAPI.getState()
    if (post.loading)
      throw "loading"

    thunkAPI.dispatch(setLoading())

    const response = await axios.get(`http://192.168.1.36:3001/posts?_page=${post.page}&_limit=5`);
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
  initialState: { posts: [], loading: false, page: 1 },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: {
    // @ts-ignore
    [fetchPosts.fulfilled]: (state, action) => {
      return {
        posts: state.posts.concat(action.payload),
        loading: false,
        page: state.page + 1
      }
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
