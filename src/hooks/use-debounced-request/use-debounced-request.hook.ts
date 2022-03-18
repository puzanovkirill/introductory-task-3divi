import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../domains/root-store.store';
import { setPredictModalIsOpen } from '../../domains/predict-modal/predict-modal.slice';
import { setPredictData } from '../../domains/predict-data/predict-data.slice';
import { setVideoLoading } from '../../domains/player-data/player-data.slice';
import useDebouncedFunction from '../use-debounced-function/use-debounced-function.hook';

export default function useDebouncedRequest(delay: number) {
  const dispatch = useDispatch();
  const currentVideoCapture = useSelector(
    (state: RootState) => state.videoPlayerData.capture
  );

  const handlePostRequest = async (url, signal) => {
    if (currentVideoCapture.blob) {
      dispatch(setVideoLoading(true));
      const formData = new FormData();
      formData.append('file', currentVideoCapture.blob, 'upload-image.jpg');

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          signal: signal,
        });

        const result = await response.json();

        if (result.samples[0].length !== 0) {
          dispatch(setVideoLoading(false));
          dispatch(setPredictModalIsOpen(true));
          dispatch(setPredictData(result.samples[0].objects));
        }
      } catch (e) {
        dispatch(setVideoLoading(false));
        dispatch(setPredictModalIsOpen(false));
        if (e.name === 'AbortError') {
          return;
        }
        alert(`Something went wrong. Try again later.`);
      }
    }
  };

  return useDebouncedFunction(
    (url: string, signal: AbortSignal) => handlePostRequest(url, signal),
    delay
  );
}
