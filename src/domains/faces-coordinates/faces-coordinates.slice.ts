import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FaceCoordinateSliceState = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isActive: boolean;
  gender: string;
};

const initialState: Array<FaceCoordinateSliceState> =
  new Array<FaceCoordinateSliceState>();

const facesCoordinatesSlice = createSlice({
  name: 'facesCoordinates',
  initialState,
  reducers: {
    addFaceCoordinates(state, action: PayloadAction<FaceCoordinateSliceState>) {
      state.push(action.payload);
    },
    resetFacesCoordinates(state) {
      state.length = 0;
    },
    setFaceCoordinatesActive(state, action: PayloadAction<number>) {
      state.forEach((item) => (item.isActive = false));
      state[action.payload].isActive = true;
    },
  },
});

export const {
  addFaceCoordinates,
  resetFacesCoordinates,
  setFaceCoordinatesActive,
} = facesCoordinatesSlice.actions;

const faceCoordinatesItems = (state) => state;

export const getActiveElementIndex = createSelector(
  faceCoordinatesItems,
  (state) => state.findIndex((item) => item.isActive)
);

export default facesCoordinatesSlice.reducer;
