import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
interface Props {
  className?: string;
}

const Carousel: React.FC<Props> = ({ children: carouselChild }) => {

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
  });
  const children = React.Children.toArray(carouselChild);

  return (
    <div ref={sliderRef} className="keen-slider">
      {children.map((carouselItem, index) => {
        if (React.isValidElement(carouselItem)) {
          return (
            <div className="keen-slider__slide" key={index}>
              {React.cloneElement(carouselItem)}
            </div>
          );
        }

        return (
          <div className="keen-slider__slide" key={index}>
            {carouselItem}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
