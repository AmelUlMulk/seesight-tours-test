/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import PrevslideIcon from '../../assets/svg/prevslideicon.svg';
import NextslideIcon from '../../assets/svg/nextslideicon.svg';
import styled from 'styled-components';
const StyledSwipper = styled(Swiper)`
  .swiper-wrapper {
    max-height: 350px;
    min-height: 220px;
  }
`;
interface REVIEWSWIPPERINTERFACE {
  reviews: [
    {
      rating: number;
      review: string;
      traveller: string;
    }
  ];
}
const ReviewSwipper = ({ reviews }: REVIEWSWIPPERINTERFACE) => {
  return (
    <div className="flex  md:w-[45%] justify-center items-center mt-14 max-h-[472px]   ">
      <StyledSwipper
        slidesPerView="auto"
        spaceBetween={20}
        navigation={{
          nextEl: '.nextBtn',
          prevEl: '.prevBtn'
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 20
          }
        }}
      >
        {reviews.slice(0, 10).map(review => {
          if (review?.review?.length > 10)
            return (
              <SwiperSlide key={review.review} className="flex flex-col   ">
                <div className="h-full min-h-[180px] flex-col items-center justify-center ">
                  <div className="flex  flex-col min-h-[180px]   relative bg-[#000000] opacity-80 scrollbar-hide  overflow-y-scroll scrol   text-white   px-3 xsm:px-5 md:px-5 lg:px-6 xl:px-10 pt-3 xsm:pt-5 md:pt-5 lg:pt-6 pb-2 rounded-lg">
                    <Image
                      src="/quote.png"
                      width={30}
                      height={30}
                      alt=""
                      className="w-[20px] "
                    />
                    <p className="text-[12px] max-h-[100px] sm:text-[15px] xl:text-[16px] font-[400]   ">
                      {review.review}
                    </p>
                    {/*  <p className="absolute top-1 right-2 text-right text-[10px] sm:text-[12px] xl:text-[14px] font-[400] italic">
                  {sourceIcon(review.source)}
                </p> */}
                  </div>
                  <div
                    className="bg-[#000000] opacity-[80%] w-[30px] h-[30px] absolute bottom-[3] left-8 z-30"
                    style={{
                      clipPath: 'polygon(0 0, 46% 65%, 100% 0)'
                    }}
                  ></div>
                  <div className="text-black pt-5 pl-5 lg:text-[16px] xl:text-[18px] font-[700]">
                    {review.traveller}
                  </div>
                </div>
              </SwiperSlide>
            );
        })}
        <div className="flex justify-end ">
          <div className="flex justify-center items-center">
            <button className="text-white bg-[#F15C5A] rounded-[50%] p-4 w-[45px] h-[45px] prevBtn">
              <PrevslideIcon />
            </button>
            <button className="text-white bg-[#F15C5A] rounded-[50%] p-4 w-[45px] h-[45px] nextBtn">
              <NextslideIcon />
            </button>
          </div>
        </div>
      </StyledSwipper>
    </div>
  );
};

export default ReviewSwipper;
