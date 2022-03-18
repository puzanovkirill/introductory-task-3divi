import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domains/root-store.store';
import FaceSquare from '../../modules/face-square/face-square.module';

function FaceSquareList({ divRef }) {
  const facesCoordinates = useSelector(
    (state: RootState) => state.facesCoordinates
  );
  const predictModal = useSelector((state: RootState) => state.predictModal);
  return (
    <>
      {facesCoordinates.map((face, index) => {
        return (
          <FaceSquare
            divRef={divRef}
            face={face}
            key={`${face.x1}${face.y1}${face.x2}${face.y2}`}
            predictModal={predictModal}
            index={index}
          />
        );
      })}
    </>
  );
}

export default FaceSquareList;
