import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import React from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
const StyledImage = styled(Image)`
  min-height: 450px !important;
  max-height: 450px;
  @media (max-width: 1000px) {
    max-height: 300px;
    min-height: 300px !important;
  }
`;
const StyledVideo = styled.video`
  min-height: 450px !important;
  max-height: 450px;
  @media (max-width: 1000px) {
    max-height: 300px;
    min-height: 300px !important;
  }
`;
interface SwipperProps {
  media: [
    {
      url: string;
    }
  ];
}

const HeroSwipper = ({ media }: SwipperProps) => {
  const SwipperParams = {
    navigation: true,
    className: 'w-full  max-h-[450px] ',
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: { clickable: true },
    effect: 'slide',
    grabCursor: true,
    a11y: { enabled: true },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      300: {
        slidesPerView: 1
      },
      400: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 2
      },
      800: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  };
  SwiperCore.use([Navigation]);
  return (
    //@ts-ignore
    <Swiper {...SwipperParams}>
      {media.map((media, index) => {
        return (
          <SwiperSlide key={media.url} className="w-2/6 min-h-full  ">
            {media.url.includes('jpg') ? (
              <StyledImage
                src={media.url}
                width={500}
                height={300}
                alt={media.url}
                quality={70}
                className="w-full object-fill h-full "
                placeholder="blur"
                blurDataURL="/placeholder.webp"
              />
            ) : (
              <StyledVideo
                autoPlay={index === 0}
                controls={index > 0}
                muted
                loop
                className="w-full object-fill h-full  "
                src={media.url}
              />
            )}
          </SwiperSlide>
        );
      })}
      {/* <div
          onClick={() => swiper.slideNext()}
          className=" absolute z-10 top-2/4 right-5 flex  justify-center bg-red-500 w-12 h-12 rounded-full p-3  "
        >
          <Image src="/next.png" width={20} height={20} alt="next" />
        </div>
        <div className=" absolute z-10 top-2/4 left-1 flex   rotate-180   justify-center bg-red-500 w-12 h-12 rounded-full p-3  ">
          <Image src="/next.png" width={20} height={20} alt="next" />
        </div> */}
    </Swiper>
  );
};

export default HeroSwipper;
