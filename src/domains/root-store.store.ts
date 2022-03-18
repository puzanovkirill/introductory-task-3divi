import { createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import predictDataSlice from './predict-data/predict-data.slice';
import predictModalSlice from './predict-modal/predict-modal.slice';
import facesCoordinatesSlice from './faces-coordinates/faces-coordinates.slice';
import videoPlayerDataSlice from './player-data/player-data.slice';

const rootReducer = combineReducers({
  predictModal: predictModalSlice,
  predictData: predictDataSlice,
  facesCoordinates: facesCoordinatesSlice,
  videoPlayerData: videoPlayerDataSlice,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
