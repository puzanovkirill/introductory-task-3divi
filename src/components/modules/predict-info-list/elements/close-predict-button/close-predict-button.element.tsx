import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../button/button.element';
import { setPredictModalIsOpen } from '../../../../../domains/predict-modal/predict-modal.slice';
import { RootState } from '../../../../../domains/root-store.store';

const CloseButton = styled(Button)`
  color: #fff;
  padding: 0.5rem;
  background-color: #29313d;
  border: none;
  font-size: 1rem;
  transition: 0.3s all;
  cursor: pointer;
  border-radius: 0 0 10px 10px;
  padding-bottom: 1rem;
`;

function ClosePredictButton() {
  const predictModal = useSelector((state: RootState) => state.predictModal);
  const dispatch = useDispatch();

  const handleCloseButtonClick = () => {
    dispatch(setPredictModalIsOpen(!predictModal.isOpen));
  };

  return (
    <CloseButton onClick={handleCloseButtonClick}>
      {predictModal.isOpen ? 'Hide predict' : 'Show predict'}
    </CloseButton>
  );
}

export default ClosePredictButton;
