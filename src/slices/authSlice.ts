import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { AsyncStorage } from "react-native";
import { BASE_URL } from "../constants";

type LoginPayload = { email: string, password: string };

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, thunkAPI) => {
    thunkAPI.dispatch(setLoading())
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      return response.data;
    } catch (e) {
      // this is pretty ugly
      throw e?.response?.data?.message ?? e
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: { error: '', loggedIn: false, loading: false },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: {
    // @ts-ignore
    [loginThunk.fulfilled]: (state, action) => {
      AsyncStorage.setItem("token", action.payload.token)
      return { ...state, error: '', loggedIn: true, loading: false }
    },
    // @ts-ignore
    [loginThunk.rejected]: (state, action) => {
      return { ...state, error: action.error.message, loading: false }
    }
  }
});

const { setLoading } = authSlice.actions;
export { loginThunk, setLoading };
export const authReducer = authSlice.reducer;
