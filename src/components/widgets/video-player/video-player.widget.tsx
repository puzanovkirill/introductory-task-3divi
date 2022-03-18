import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domains/root-store.store';
import Loading from '../../elements/loading/loading.element';
import FaceSquareList from '../../blocks/face-square-list/face-square-list.block';
import ReactPlayerComponent from '../../modules/react-player/react-player.module';
import styled from 'styled-components';
import useResetPredict from '../../../hooks/use-reset-predict/use-reset-predict.hook';
import useDebouncedRequest from '../../../hooks/use-debounced-request/use-debounced-request.hook';
import useFileUpload from '../../../hooks/use-file-upload/use-file-upload.hook';

const RelativeDiv = styled.div`
  position: relative;
`;

function VideoPlayer() {
  const currentVideoCapture = useSelector(
    (state: RootState) => state.videoPlayerData.capture
  );
  const player = useRef<ReactPlayer>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const resetPredict = useResetPredict();
  const postRequest = useDebouncedRequest(700);
  const handleFileUpload = useFileUpload(setIsFileUploading);
  const videoUrl = useSelector((state: RootState) => state.videoPlayerData.url);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e);
    setIsFileUploading(true);
  };

  useEffect(() => {
    resetPredict();
    if (isFileUploading) {
      return () => {
        setIsFileUploading(false);
      };
    }

    if (isPlaying) return;
    const controller = new AbortController();
    const signal = controller.signal;
    postRequest('https://face.demo.3divi.com/api', signal);

    return () => {
      controller.abort();
    };
  }, [currentVideoCapture, isPlaying, isFileUploading]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, []);

  return (
    <div>
      <RelativeDiv ref={divRef}>
        <Loading />
        <ReactPlayerComponent
          player={player}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <FaceSquareList divRef={divRef} />
      </RelativeDiv>
      <input type="file" onChange={handleInputChange} accept=" video/*" />
    </div>
  );
}

export default VideoPlayer;
