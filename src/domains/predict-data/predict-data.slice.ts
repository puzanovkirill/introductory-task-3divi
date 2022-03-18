import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PredictDataSliceState = {
  angles: {
    pitch: number;
    roll: number;
    yaw: number;
  };
  bbox: [number, number, number, number];
  id: number;
  confidence: number;
  face_meta: {
    age: { value: number };
    emotions: [
      { confidence: number; value: string },
      { confidence: number; value: string },
      { confidence: number; value: string },
      { confidence: number; value: string }
    ];
    gender: { value: string };
    liveness: { confidence: number; value: string };
    mask: { confidence: number; value: boolean };
  };
};

const initialState: Array<PredictDataSliceState> =
  new Array<PredictDataSliceState>();

const predictDataSlice = createSlice({
  name: 'predictData',
  initialState,
  reducers: {
    setPredictData(state, action: PayloadAction<Array<PredictDataSliceState>>) {
      return action.payload;
    },
  },
});

export const { setPredictData } = predictDataSlice.actions;

export default predictDataSlice.reducer;
