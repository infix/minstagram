import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { AsyncStorage } from "react-native";
import { BASE_URL } from "../constants";
import { put } from "redux-saga/effects";

type LoginPayload = { email: string, password: string };

export const LoginAction = createAction<LoginPayload>('auth/login')
export const LoginActionSuccess = createAction<{ token: string }>('auth/login/success')
export const LoginActionFailed = createAction<string>('auth/login/failed')

export function* loginSaga(action: { payload: LoginPayload }) {
  yield put(setLoading())
  try {
    const response = yield axios.post(`${BASE_URL}/login`, action.payload);
    yield put(LoginActionSuccess(response.data));
  } catch (e) {
    yield put(LoginActionFailed(e?.response?.data?.message ?? e))
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { error: '', loggedIn: false, loading: false },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: builder => {
    builder.addCase(LoginActionSuccess, (state, action) => {
      AsyncStorage.setItem("token", action.payload.token)
      return { ...state, error: '', loggedIn: true, loading: false }
    });
    builder.addCase(LoginActionFailed, (state, action) =>
      ({ ...state, error: action.payload, loading: false }))
  }
});

const { setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
