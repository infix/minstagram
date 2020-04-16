import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authReducer } from "./slices/authSlice";
import { postReducer } from "./slices/postSlice";
import { bucketListReducer } from "./slices/bucketListSlice";
import { userReducer } from "./slices/userSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";

export function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

  const store = configureStore({
    reducer: {
      auth: authReducer,
      post: postReducer,
      bucketList: bucketListReducer,
      user: userReducer,
    },
    middleware: middlewares
  })
  sagaMiddleware.run(rootSaga)
  return store;
}
