import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "../constants";
import { put } from "redux-saga/effects";

type ProfileType = {
  name: string;
  email: string;
  age: string;
  avatar: string;
}

export const getProfileAction = createAction<void>('user/profile');
const getProfileActionSuccess = createAction<ProfileType>('user/profile/success');
const getProfileActionFailed = createAction<string>('user/profile/failed');

function* getProfileSaga() {
  yield put(setLoading())
  try {
    const response = yield axios.get(`${BASE_URL}/profile`);
    yield put(getProfileActionSuccess(response.data));
  } catch (e) {
    yield put(getProfileActionFailed(e?.response?.data?.message ?? e))
  }
}


const userSlice = createSlice({
  name: 'user',
  initialState: { error: '', loading: false, profile: null },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: builder => {
    builder.addCase(getProfileActionSuccess, (state, action) =>
      ({ ...state, loading: false, error: '', profile: action.payload as any }));

    builder.addCase(getProfileActionFailed, (state, action) =>
      ({ ...state, loading: false, error: action.payload }))
  }
});

const { setLoading } = userSlice.actions;
export { getProfileSaga };
export const userReducer = userSlice.reducer;
