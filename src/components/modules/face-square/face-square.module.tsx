import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { setFaceCoordinatesActive } from '../../../domains/faces-coordinates/faces-coordinates.slice';

const pulse = keyframes`
0% {
    box-shadow: 0 0 0 0 rgba(247, 226, 89, 0.7);
  }
  70% {
    box-shadow: 0 0 3px 10px rgba(247, 226, 89, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(247, 226, 89, 0);
  }
`;

const animationRule = css`
  animation: ${pulse} 3s infinite;
`;

const Div = styled.div`
  position: absolute;
  top: ${(props) =>
    props.divRef.current
      ? props.divRef.current.offsetHeight * props.face.y1
      : ''}px;
  left: ${(props) =>
    props.divRef.current
      ? props.divRef.current.offsetWidth * props.face.x1
      : ''}px;
  width: ${(props) =>
    props.divRef.current
      ? props.divRef.current.offsetWidth * props.face.x2 -
        props.divRef.current.offsetWidth * props.face.x1
      : ''}px;
  height: ${(props) =>
    props.divRef.current
      ? props.divRef.current.offsetHeight * props.face.y2 -
        props.divRef.current.offsetHeight * props.face.y1
      : ''}px;
  border: ${(props) =>
    props.face.isActive
      ? '3px solid #f7e259'
      : props.face.gender === 'MALE'
      ? '2px solid #3d8bff'
      : '2px solid #ff57a5'};
  cursor: pointer;
  border-radius: 4px;
  display: ${(props) => (props.predictModal.isOpen ? '' : 'none')};
  ${(props) => (props.face.isActive ? animationRule : '')};
  z-index: ${(props) => (props.face.isActive ? 9999 : '')};
`;

function FaceSquare({ divRef, index, predictModal, face }) {
  const dispatch = useDispatch();
  const handleDivClick = () => {
    dispatch(setFaceCoordinatesActive(index));
  };
  return (
    <Div
      divRef={divRef}
      face={face}
      key={index}
      predictModal={predictModal}
      pulse={pulse}
      onClick={handleDivClick}
    ></Div>
  );
}

export default FaceSquare;
