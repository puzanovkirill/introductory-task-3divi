import { useDispatch } from 'react-redux';
import { resetFacesCoordinates } from '../../domains/faces-coordinates/faces-coordinates.slice';
import { setPredictData } from '../../domains/predict-data/predict-data.slice';
import { setPredictModalIsOpen } from '../../domains/predict-modal/predict-modal.slice';
import {
  setVideoLoading,
  setCurrentVideoCapture,
} from '../../domains/player-data/player-data.slice';
export default function useResetPredict() {
  const dispatch = useDispatch();

  return () => {
    dispatch(setCurrentVideoCapture({}));
    dispatch(resetFacesCoordinates());
    dispatch(setPredictData([]));
    dispatch(setPredictModalIsOpen(false));
    dispatch(setVideoLoading(false));
  };
}
