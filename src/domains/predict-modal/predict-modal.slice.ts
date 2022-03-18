import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  isOpen: boolean;
};

const initialState: SliceState = { isOpen: false };

const predictModalSlice = createSlice({
  name: 'predictModal',
  initialState,
  reducers: {
    setPredictModalIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setPredictModalIsOpen } = predictModalSlice.actions;

export default predictModalSlice.reducer;
