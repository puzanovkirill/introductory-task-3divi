import React from 'react';
import { useSwiper } from 'swiper/react';
import { Button } from '../button/button.element';

function SlideNextButton({ setCount }) {
  const swiper = useSwiper();

  const handleButtonClick = () => {
    swiper.slideNext();
    setCount(swiper.activeIndex + 1);
  };

  return <Button onClick={handleButtonClick}>{'→'}</Button>;
}

export default SlideNextButton;
