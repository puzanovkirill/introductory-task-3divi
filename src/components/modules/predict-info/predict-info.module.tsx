import * as React from 'react';
import styled from 'styled-components';
import { PredictDataSliceState } from '../../../domains/predict-data/predict-data.slice';

const InfoWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  color: #fff;
  border-radius: 10px;
  text-align: left;
`;

const LivenessDiv = styled.div`
  color: ${(props) =>
    props.liveness.confidence >= 0.6 ? '#5ef277' : '#f76345'};
`;

const EmotionDiv = styled.div`
  color: ${(props) => (props.index === 0 ? '#5ef277' : '')};
`;

const PredictInfo: React.FC<{ predictData: PredictDataSliceState }> = (
  props
) => {
  return (
    <InfoWrapper>
      {props.predictData && Object.keys(props.predictData).length !== 0 ? (
        <>
          <div>
            Face confidence:{' '}
            {Math.round(
              (props.predictData.confidence + Number.EPSILON) * 10000
            ) / 100}
            %
          </div>
          <div>
            {props.predictData.face_meta.gender.value},
            {props.predictData.face_meta.age.value} years
          </div>
          <LivenessDiv liveness={props.predictData.face_meta.liveness}>
            Face is {props.predictData.face_meta.liveness.value}:{' '}
            {Math.round(
              (props.predictData.face_meta.liveness.confidence +
                Number.EPSILON) *
                10000
            ) / 100}
            %
          </LivenessDiv>
          <div>
            {props.predictData.face_meta.mask.value
              ? 'With a mask'
              : 'Without a mask'}
          </div>
          <div>
            {props.predictData.face_meta.emotions.map((emotion, index) => {
              return (
                <EmotionDiv index={index} key={emotion.value}>
                  {emotion.value} :{' '}
                  {Math.round((emotion.confidence + Number.EPSILON) * 10000) /
                    100}
                  %
                </EmotionDiv>
              );
            })}
          </div>
          <div>
            {Object.entries(props.predictData.angles).map(([key, value]) => (
              <div key={key}>
                {key} : {Math.round((value + Number.EPSILON) * 100) / 100}°
              </div>
            ))}
          </div>
        </>
      ) : null}
    </InfoWrapper>
  );
};

export default PredictInfo;
