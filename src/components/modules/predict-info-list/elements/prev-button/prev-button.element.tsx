import React from 'react';
import { useSwiper } from 'swiper/react';
import { Button } from '../button/button.element';

function SlidePrevButton({ setCount }) {
  const swiper = useSwiper();

  const handleButtonClick = () => {
    swiper.slidePrev();
    setCount(swiper.activeIndex + 1);
  };

  return <Button onClick={handleButtonClick}>{'←'}</Button>;
}

export default SlidePrevButton;
