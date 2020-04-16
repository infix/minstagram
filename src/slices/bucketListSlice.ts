import { createAction, createSlice } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { put } from "redux-saga/effects";

const BUCKET_LIST_PLACES = "bucket-list-places";

export const addPlaceAction = createAction<string>("bucketList/add")
export const addPlaceActionFailure = createAction<string>("bucketList/add/failure")
export const loadPlacesAction = createAction<void>('bucketList/load')
export const removePlaceAction = createAction<string>("bucketList/remove")

export function* addPlaceSaga(action: { payload: string }) {
  const name = action.payload;
  const placesString = yield AsyncStorage.getItem(BUCKET_LIST_PLACES);
  const places: string[] = placesString ? JSON.parse(placesString) : [];

  if (places.includes(name)) {
    yield put(addPlaceActionFailure(`${name} already exists!`));
  } else {
    const newPlaces = [...places, name];
    yield AsyncStorage.setItem(BUCKET_LIST_PLACES, JSON.stringify(newPlaces));
    yield put(setPlaces(newPlaces));
  }
}

export function* loadPlacesSaga() {
  const placesString = yield AsyncStorage.getItem(BUCKET_LIST_PLACES);
  yield put(setPlaces(placesString ? JSON.parse(placesString) : []))
}

export function* removePlaceSaga(action: { payload: string }) {
  const name = action.payload
  const placesString = yield AsyncStorage.getItem(BUCKET_LIST_PLACES);
  const places: string[] = placesString ? JSON.parse(placesString) : [];
  const newPlaces = places.filter(place => place !== name)
  yield AsyncStorage.setItem(BUCKET_LIST_PLACES, JSON.stringify(newPlaces));
  yield put(setPlaces(newPlaces));
}

const bucketListSlice = createSlice({
  name: 'bucketList',
  initialState: { places: [], errorMessage: '' },
  reducers: {
    setPlaces(state, action) {
      return { ...state, places: action.payload, errorMessage: '' }
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(addPlaceActionFailure, (state: any, action: { payload: string }) =>
      ({ ...state, errorMessage: action.payload }))
  }
});

const { setPlaces } = bucketListSlice.actions;
export const bucketListReducer = bucketListSlice.reducer;
