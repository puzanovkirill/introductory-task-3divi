import React from 'react';
import styled from 'styled-components';
import PredictInfoList from '../../modules/predict-info-list/predict-info-list.module';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domains/root-store.store';

const PredictWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

function PredictInfoLayout() {
  const predictData = useSelector((state: RootState) => state.predictData);

  return (
    <PredictWrapper>
      {predictData.length > 0 ? <PredictInfoList /> : null}
    </PredictWrapper>
  );
}

export default PredictInfoLayout;
