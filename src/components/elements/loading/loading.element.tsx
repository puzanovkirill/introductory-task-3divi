import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../domains/root-store.store';

const LoadingDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 5rem;
  display: ${(props: { isLoading: boolean }) =>
    props.isLoading ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: #fff;
`;

function Loading() {
  const loading = useSelector(
    (state: RootState) => state.videoPlayerData.isLoading
  );

  return (
    <LoadingDiv isLoading={loading}>
      <i className="fa fa-cog fa-spin" />
    </LoadingDiv>
  );
}

export default Loading;
