import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { AsyncStorage } from "react-native";

type LoginPayload = { email: string, password: string };

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, thunkAPI) => {
    thunkAPI.dispatch(setLoading())
    const response = await axios.post(`http://192.168.1.36:3001/login`, { email, password });
    return response.data;
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
    [loginThunk.rejected]: (state) => {
      return { ...state, error: "Check your user name or password", loading: false }
    }
  }
});

const { setLoading } = authSlice.actions;
export { loginThunk, setLoading };
export const authReducer = authSlice.reducer;
