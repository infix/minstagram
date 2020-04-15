import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from "./slices/authSlice";
import { postReducer } from "./slices/postSlice";
import { bucketListReducer } from "./slices/bucketListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    bucketList: bucketListReducer
  },
})
