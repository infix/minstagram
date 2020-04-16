import { LoginAction, loginSaga } from "./slices/authSlice";
import { getProfileAction, getProfileSaga } from "./slices/userSlice";
import {
  addPlaceAction,
  addPlaceSaga,
  loadPlacesAction,
  loadPlacesSaga,
  removePlaceAction,
  removePlaceSaga
} from "./slices/bucketListSlice";
import { addNewPostAction, addNewPostSaga, fetchPostsAction, fetchPostsSaga } from "./slices/postSlice";
import { takeEvery } from "redux-saga/effects";

export function* rootSaga() {
  yield takeEvery(LoginAction, loginSaga);
  yield takeEvery(getProfileAction, getProfileSaga);
  yield takeEvery(loadPlacesAction, loadPlacesSaga);
  yield takeEvery(addPlaceAction, addPlaceSaga);
  yield takeEvery(removePlaceAction, removePlaceSaga);
  yield takeEvery(fetchPostsAction, fetchPostsSaga);
  yield takeEvery(addNewPostAction, addNewPostSaga);
}
