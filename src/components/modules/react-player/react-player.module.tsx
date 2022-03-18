import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../domains/root-store.store';
import captureVideoFrame from 'capture-video-frame';
import { setCurrentVideoCapture } from '../../../domains/player-data/player-data.slice';
import styled from 'styled-components';

function ReactPlayerComponent({ player, isPlaying, setIsPlaying }) {
  const currentVideoURL = useSelector(
    (state: RootState) => state.videoPlayerData.url
  );
  const dispatch = useDispatch();

  const handleGetCapture = () => {
    const frame = captureVideoFrame(player?.current?.getInternalPlayer());
    dispatch(setCurrentVideoCapture(frame));
  };

  const handlePlayerPause = () => {
    setIsPlaying(false);
    handleGetCapture();
  };

  const handlePlayerSeek = () => {
    player?.current?.getInternalPlayer().pause();
    handlePlayerPause();
  };

  const handlePlayerPlay = () => {
    setIsPlaying(true);
  };

  return (
    <PlayerDiv currentVideoURL={currentVideoURL}>
      <ReactPlayer
        ref={player}
        url={currentVideoURL}
        controls
        playing={isPlaying}
        onSeek={handlePlayerSeek}
        onPause={handlePlayerPause}
        onPlay={handlePlayerPlay}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        }}
      />
    </PlayerDiv>
  );
}

export default ReactPlayerComponent;

const PlayerDiv = styled.div`
  display: ${(props) => (props.currentVideoURL ? 'block' : 'none')};
`;
