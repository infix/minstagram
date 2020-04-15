import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { authReducer, LoginAction, loginSaga } from "./slices/authSlice";
import { postReducer } from "./slices/postSlice";
import { bucketListReducer } from "./slices/bucketListSlice";
import { userReducer } from "./slices/userSlice";

import { takeEvery } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";


function* rootSaga() {
  yield takeEvery(LoginAction, loginSaga);
}

export function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [...getDefaultMiddleware(/*{ thunk: false }*/), sagaMiddleware]

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
