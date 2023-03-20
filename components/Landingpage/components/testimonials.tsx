import Image from 'next/image';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
SwiperCore.use([Navigation]);
import NextslideIcon from '../../../assets/svg/nextslideicon.svg';
import PrevslideIcon from '../../../assets/svg/prevslideicon.svg';
import { useQuery } from '@apollo/client';
import { TESTIMONIALS, TESTIMONIAL_INTERFACE } from '../../../api/testimonials';
const TestimonialStyle = styled.section`
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.532),
      rgba(43, 43, 43, 0.041)
    ),
    url('/testimonial.png');
  border-radius: 10px;
`;
export const TextShadow = styled.h1`
  text-shadow: 1px -42px 1px rgba(51, 51, 51, 0.1);
`;
const Testimonials = () => {
  const {
    data: { reviews = [] } = {},
    loading,
    error
  } = useQuery<TESTIMONIAL_INTERFACE>(TESTIMONIALS);
  //reviews with max 120 characters
  const filterReviews = reviews?.filter((review: any) => {
    if (review?.review !== null) {
      return review?.rating === 5 && review?.review.length < 120;
    }
  });

  return (
    <TestimonialStyle
      id="testimonials"
      className="px-10 sm:px-20 md:px-20 lg:px-32 2xl:px-40 bg-no-repeat bg-cover my-10 py-5"
    >
      <div>
        <h1 className="text-[#333333] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[50px] 2xl:text-[56px] font-[700] pb-3">
          TESTIMONIALS
        </h1>
      </div>
      <div id="slider-container" className="lg:max-h-[350px] h-[100%]">
        <div
          id="slider-grid"
          className="flex justify-between items-center gap-2 sm:gap-5"
        >
          <div className="flex justify-center items-center">
            <button className="text-white bg-[#F15C5A] rounded-[50%] p-4 w-[45px] h-[45px] prevBtn">
              <PrevslideIcon />
            </button>
          </div>
          <Swiper
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
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }}
          >
            {filterReviews.slice(0, 10).map(dt => (
              <SwiperSlide key={dt.id}>
                <div>
                  <div className="flex flex-col relative bg-[#000000] opacity-80  text-white xxsm:min-h-[140px] xsm:min-h-[150px]  sm:min-h-[140px] md:min-h-[160px] xl:min-h-[180px] 2xl:min-h-[165px] 3xl:max-h-[170px] 4xl:max-h-[170px] h-[100%] px-3 xsm:px-5 md:px-5 lg:px-6 xl:px-10 pt-3 xsm:pt-5 md:pt-5 lg:pt-6 pb-2 rounded-lg">
                    <Image
                      src="/quote.png"
                      width={30}
                      height={30}
                      alt=""
                      className="w-[20px] "
                    />
                    <p className="pt-2 text-[12px] sm:text-[15px] xl:text-[16px] font-[400]">
                      {dt.review}
                    </p>
                    <p className="pt-2 text-right text-[12px] sm:text-[15px] xl:text-[16px] font-[400] italic">
                      Source: {dt.source}
                    </p>
                    <div
                      className="bg-[#000000] opacity-[80%] w-[30px] h-[30px] absolute top-[100%] left-8"
                      style={{
                        clipPath: 'polygon(0 0, 46% 65%, 100% 0)'
                      }}
                    ></div>
                  </div>
                  <div className="text-[#FFFFFF] pt-5 pl-5 lg:text-[16px] xl:text-[18px] font-[700]">
                    {dt.traveller}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center items-center">
            <button className="bg-[#F15C5A] text-white rounded-[50%] p-4 w-[45px] h-[45px] nextBtn">
              <NextslideIcon />
            </button>
          </div>
        </div>
      </div>
    </TestimonialStyle>
  );
};

export default Testimonials;
