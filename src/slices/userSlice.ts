import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const getProfile = createAsyncThunk(
  "auth/profile",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading())
    const response = await axios.get(`http://192.168.1.36:3001/profile`);
    return response.data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: { error: '', loading: false, profile: null },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    }
  },
  extraReducers: {
    [getProfile.fulfilled as any](state, action) {
      return { ...state, loading: false, error: '', profile: action.payload }
    },
    [getProfile.rejected as any](state, action) {
      return { ...state, loading: false, error: action.error.message }
    }
  }
});

const { setLoading } = userSlice.actions;
export { getProfile };
export const userReducer = userSlice.reducer;
