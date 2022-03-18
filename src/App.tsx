import * as React from 'react';
import PredictInfoLayout from './components/layouts/predict-info/predict-info.layout';
import VideoPlayer from './components/widgets/video-player/video-player.widget';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1140px;
  margin: 0 auto;
  @media (max-width: 1140px) {
    max-width: 100%;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

function App() {
  return (
    <Wrapper>
      <VideoPlayer />
      <PredictInfoLayout />
    </Wrapper>
  );
}

export default App;
