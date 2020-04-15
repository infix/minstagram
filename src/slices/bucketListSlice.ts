import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";

const BUCKET_LIST_PLACES = "bucket-list-places";

type addPlaceArgs = { name: string };
const addPlace = createAsyncThunk(
  "bucketList/add",
  async ({ name }: addPlaceArgs) => {
    const placesString = await AsyncStorage.getItem(BUCKET_LIST_PLACES);
    const places: string[] = placesString ? JSON.parse(placesString) : [];

    // throw an error if the place already exists.
    if (places.includes(name))
      throw `${name} already exists!`;

    // merge places
    const newPlaces = [...places, name];

    await AsyncStorage.setItem(BUCKET_LIST_PLACES, JSON.stringify(newPlaces));
    return newPlaces;
  }
)

const loadPlaces = createAsyncThunk(
  "bucketList/load",
  async () => {
    const placesString = await AsyncStorage.getItem(BUCKET_LIST_PLACES);
    // if no places exist create a new list with current place
    return placesString ? JSON.parse(placesString) : [];
  }
)

export const removePlace = createAsyncThunk(
  "bucketList/remove",
  async ({ name }: { name: string }) => {
    const placesString = await AsyncStorage.getItem(BUCKET_LIST_PLACES);
    const places: string[] = placesString ? JSON.parse(placesString) : [];
    const newPlaces = places.filter(place => place !== name)
    await AsyncStorage.setItem(BUCKET_LIST_PLACES, JSON.stringify(newPlaces));
    return newPlaces;
  }
)

const bucketListSlice = createSlice({
  name: 'bucketList',
  initialState: { places: [], errorMessage: '' },
  reducers: {},
  extraReducers: {
    [removePlace.fulfilled as any](state, action) {
      console.log("Removing: ", action.payload)
      return { ...state, places: action.payload }
    },
    // @ts-ignore
    [loadPlaces.fulfilled](state, action) {
      return { ...state, places: action.payload }
    },
    // @ts-ignore
    [addPlace.fulfilled](state, action) {
      return { ...state, places: action.payload, errorMessage: '' }
    },
    // @ts-ignore
    [addPlace.rejected](state, action) {
      console.log({ action })
      return { ...state, errorMessage: action.error.message }
    }
  }
});

export { addPlace, loadPlaces };
export const bucketListReducer = bucketListSlice.reducer;
