import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PredictInfo from '../predict-info/predict-info.module';
import { RootState } from '../../../domains/root-store.store';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import 'swiper/css';
import {
  addFaceCoordinates,
  getActiveElementIndex,
  resetFacesCoordinates,
  setFaceCoordinatesActive,
} from '../../../domains/faces-coordinates/faces-coordinates.slice';
import { Swiper as SwiperType } from 'swiper/types';
import { Controller } from 'swiper';
import SlidePrevButton from './elements/prev-button/prev-button.element';
import SlideNextButton from './elements/next-button/next-button.element';
import SlidePersonCountInfo from './elements/person-count-info/person-count-info.element';
import ClosePredictButton from './elements/close-predict-button/close-predict-button.element';

const Wrapper = styled.div`
  background-color: #29313d;
  padding: 1rem;
  color: #fff;
  border-radius: 10px 10px 0 0;
  text-align: left;
  display: ${(props) => (props.predictModal.isOpen ? 'block ' : 'none')};
`;

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function PredictInfoList() {
  const predictData = useSelector((state: RootState) => state.predictData);
  const predictModal = useSelector((state: RootState) => state.predictModal);
  const facesCoordinates = useSelector(
    (state: RootState) => state.facesCoordinates
  );
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [controlledSwiper, setControlledSwiper] = useState<
    SwiperType | undefined
  >(undefined);

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setCount(1);
    dispatch(resetFacesCoordinates());
    predictData.forEach((item, index) => {
      dispatch(
        addFaceCoordinates({
          x1: item.bbox[0],
          y1: item.bbox[1],
          x2: item.bbox[2],
          y2: item.bbox[3],
          isActive: false,
          gender: item.face_meta.gender.value,
        })
      );
    });
  }, [predictData, dispatch]);

  useEffect(() => {
    if (facesCoordinates.length > 0)
      setIndex(getActiveElementIndex(facesCoordinates));
  }, [facesCoordinates]);

  useEffect(() => {
    if (facesCoordinates.length > 0 && controlledSwiper) {
      controlledSwiper.slideTo(index);
      setCount(index + 1);
    }
  }, [index]);

  useEffect(() => {
    if (facesCoordinates.length > 0 && controlledSwiper)
      dispatch(setFaceCoordinatesActive(controlledSwiper.activeIndex));
    return;
  }, [count, dispatch]);

  const handleSwiperActiveIndexChange = (swiper) => {
    setIndex(swiper.activeIndex);
  };

  return (
    <>
      <Wrapper predictModal={predictModal}>
        <Swiper
          slidesPerView={1}
          controller={{ control: controlledSwiper }}
          modules={[Controller]}
          onSwiper={setControlledSwiper}
          onActiveIndexChange={handleSwiperActiveIndexChange}
          allowTouchMove={false}
        >
          {predictData.length
            ? predictData.map((data) => {
                return (
                  <SwiperSlide key={data.id} className={'no-swipe'}>
                    <div className="no-swipe">
                      <PredictInfo predictData={data} />
                    </div>
                  </SwiperSlide>
                );
              })
            : null}

          <NavDiv>
            <SlidePrevButton setCount={setCount} />
            <SlidePersonCountInfo count={count} length={predictData.length} />
            <SlideNextButton setCount={setCount} />
          </NavDiv>
        </Swiper>
      </Wrapper>
      <ClosePredictButton />
    </>
  );
}
