import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { removePlaceAction } from "./bucketListSlice";
import { BASE_URL } from "../constants";

const fetchPosts = createAsyncThunk(
  "post/fetch",
  async (args, thunkAPI) => {
    const { post } = thunkAPI.getState()
    if (post.loading)
      throw "loading"

    thunkAPI.dispatch(setLoading())

    const response = await axios.get(`${BASE_URL}/posts?_page=${post.page}&_limit=5&_sort=date&_order=desc`);
    return response.data;
  }
)


type NewPostArgs = { image: string, place?: string };
export const addNewPost = createAsyncThunk(
  "post/new",
  async ({ image, place }: NewPostArgs, thunkAPI) => {
    // @ts-ignore
    const { post, user } = thunkAPI.getState()
    if (post.loading)
      throw "loading"

    thunkAPI.dispatch(setLoading())
    if (place)
      thunkAPI.dispatch(removePlaceAction(place))

    const date = new Date().toISOString();
    const data = {
      id: Math.floor(Math.random() * 1000),
      image,
      likes: 0,
      date,
      author: { ...user.profile }
    };
    const response = await axios.post(`${BASE_URL}/posts`, data);
    return response.data;
  }
)


export interface Post {
  id: number,
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
  initialState: { posts: [], loading: false, page: 1, error: false, reachedTheEnd: false },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: {
    // @ts-ignore
    [addNewPost.fulfilled](state, action) {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: false
      }
    },
    // @ts-ignore
    [addNewPost.rejected](state, action) {
      return { ...state, loading: false, error: action.error.message }
    },
    // @ts-ignore
    [fetchPosts.fulfilled]: (state, action) => {
      return {
        posts: state.posts.concat(action.payload),
        loading: false,
        page: state.page + 1,
        error: false,
        reachedTheEnd: action.payload.length === 0
      }
    },
    // @ts-ignore
    [fetchPosts.rejected]: (state, action) => {
      // still loading
      if (action.error.message === "loading")
        return state;

      return { ...state, loading: false, error: true }
    }
  }
});

const { setLoading } = postSlice.actions;
export { fetchPosts };
export const postReducer = postSlice.reducer;
