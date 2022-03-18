import { useDispatch } from 'react-redux';
import { setCurrentVideoURL } from '../../domains/player-data/player-data.slice';

export default function useFileUpload(setIsFileUploading) {
  const dispatch = useDispatch();

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      if (
        e.target.files![0].type.substring(
          0,
          e.target.files![0].type.indexOf('/')
        ) === 'video'
      ) {
        const videoURL = URL.createObjectURL(e.target.files![0]);
        dispatch(setCurrentVideoURL(videoURL));
      } else {
        alert('You only allowed to upload video files');
      }
      setIsFileUploading(false);
    }
  };
}
