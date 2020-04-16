import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { removePlaceAction } from "./bucketListSlice";
import { BASE_URL } from "../constants";
import { put, select } from "redux-saga/effects";

export const fetchPostsAction = createAction<void>("post/fetch");
const fetchPostsActionSuccess = createAction<PostType[]>("post/fetch/success");
const fetchPostsActionFailure = createAction<string>("post/fetch/failure");

export function* fetchPostsSaga() {
  const { post } = yield select()
  if (post.loading) {
    yield put(fetchPostsActionFailure("loading"))
  } else {
    yield put(setLoading())

    try {
      const response = yield axios.get(`${BASE_URL}/posts?_page=${post.page}&_limit=5&_sort=date&_order=desc`);
      yield put(fetchPostsActionSuccess(response.data));
    } catch (e) {
      yield put(fetchPostsActionFailure(e?.response?.data?.message ?? e));
    }
  }
}

type NewPostArgs = { image: string, place?: string };
export const addNewPostAction = createAction<NewPostArgs>("post/new")
const addNewPostActionSuccess = createAction<PostType>("post/new/success")
const addNewPostActionFailure = createAction<string>("post/new/failure")

export function* addNewPostSaga(action: any) {
  const { image, place } = action.payload
  const { post, user } = yield select()
  if (post.loading) {
    yield put(addNewPostActionFailure("loading"));
  } else {
    yield put(setLoading())
    if (place)
      yield put(removePlaceAction(place))

    try {
      const date = new Date().toISOString();
      const id = Math.floor(Math.random() * 1000);
      const data = { id, image, likes: 0, date, author: user.profile };

      const response = yield axios.post(`${BASE_URL}/posts`, data);
      yield put(addNewPostActionSuccess(response.data));
    } catch (e) {
      yield put(addNewPostActionFailure(e?.response?.data?.message ?? e))
    }
  }
}

export interface PostType {
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
  initialState: { posts: [] as PostType[], loading: false, page: 1, error: false, reachedTheEnd: false },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: builder => {
    builder.addCase(addNewPostActionSuccess, (state, action) => ({
      ...state,
      posts: [action.payload, ...state.posts],
      loading: false,
      error: false
    }))

    builder.addCase(addNewPostActionFailure, (state, action) =>
      ({ ...state, loading: false, error: !!action.payload }));

    builder.addCase(fetchPostsActionSuccess, (state, action) => ({
      posts: state.posts.concat(action.payload),
      loading: false,
      page: state.page + 1,
      error: false,
      reachedTheEnd: action.payload.length === 0
    }))

    builder.addCase(fetchPostsActionFailure, (state, action) => {
      // still loading
      if (action.payload === "loading") return state;
      return { ...state, loading: false, error: true }
    })
  }
});

const { setLoading } = postSlice.actions;
export const postReducer = postSlice.reducer;
