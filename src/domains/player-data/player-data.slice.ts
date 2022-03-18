import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  isLoading: boolean;
  url: string | undefined;
  capture: { blob: string | Blob; dataUri: string; format: string };
};

const initialState: SliceState = {
  isLoading: false,
  url: undefined,
  capture: { blob: '', dataUri: '', format: '' },
};

const videoPlayerSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setVideoLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCurrentVideoURL(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setCurrentVideoCapture(state, action: PayloadAction<object>) {
      Object.assign(state.capture, action.payload);
    },
  },
});

export const { setVideoLoading, setCurrentVideoURL, setCurrentVideoCapture } =
  videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
