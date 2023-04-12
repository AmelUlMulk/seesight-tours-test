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
import logo from '../../../assets/svg/logo.svg';
import GoogleIcon from '../../../assets/svg/google-icon.svg';
import TripAdvisorLogo from '../../../assets/svg/tripadvisorlogo.svg';
import ExpediaLogo from '../../../assets/svg/expedialogo.svg';
import VIATORICON from '../../../assets/svg/viatorlogo.svg';
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
export const sourceIcon = (source: string) => {
  switch (source) {
    case 'WEBSITE':
      return '/logo.svg';
      break;
    case 'GOOGLE':
      return '/google-icon.svg';
      break;
    case 'EXPEDIA':
      return '/expediaIcon.svg';
      break;
    case 'TRIPADVISOR':
      return '/tripadvisorIcon.svg';
      break;
    case 'VIATOR':
      return '/viatorIcon.svg';
      break;
    case 'GETYOURGUIDE':
      return '/getyourguide.svg';
      break;
    default:
      return source;
  }
};
export const sourceIconDim = (source: string) => {
  switch (source) {
    case 'WEBSITE':
      return '/logo.svg';
      break;
    case 'GOOGLE':
      return '/google-icon.svg';
      break;
    case 'EXPEDIA':
      return '/expediaIcon.svg';
      break;
    case 'TRIPADVISOR':
      return '/tripadvisorIcon.svg';
      break;
    case 'VIATOR':
      return '/viatorIcon.svg';
      break;
    case 'GETYOURGUIDE':
      return '/getyourguide.svg';
      break;
    default:
      return source;
  }
};
const Testimonials = () => {
  const {
    data: { reviews = [] } = {},
    loading,
    error
  } = useQuery<TESTIMONIAL_INTERFACE>(TESTIMONIALS);
  //reviews with max 120 characters
  const filterReviews = reviews
    ?.filter((review: any) => {
      //filter out null value objects
      if (Object.values(review).some(value => value === null)) {
        return false;
      }
      return review?.rating === 5 && review?.review.length < 120;
    })
    // sorting by google reviews
    .sort((a, b) => {
      if (a.source === 'GOOGLE' && b.source !== 'GOOGLE') {
        return -1;
      } else if (a.source !== 'GOOGLE' && b.source === 'GOOGLE') {
        return 1;
      } else {
        return 0;
      }
    });
  return (
    <TestimonialStyle
      id="testimonials"
      className="px-10 sm:px-20 md:px-20 lg:px-32 2xl:px-40 bg-no-repeat bg-cover my-10 py-5"
    >
      <div>
        <h1 className="text-[#333333] text-[18px] sm:text-[26px] lg:text-[36px] font-[600] pb-3">
          TESTIMONIALS
        </h1>
      </div>
      <div id="slider-container" className="lg:max-h-[350px] h-[100%]">
        <div
          id="slider-grid"
          className="flex justify-between items-center gap-2 sm:gap-5"
        >
          <div className="flex justify-center items-center">
            <button className="text-white text-2xl sm:text-3xl bg-[#B4B4B4] rounded-full w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] prevBtn">
              {`<`}
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
                  <div className="flex flex-col relative bg-[#000000] opacity-80 text-white min-h-[140px] lg:min-h-[160px] h-[100%] px-3 xsm:px-5 lg:px-6 xl:px-10 pt-3 xsm:pt-5 lg:pt-6 pb-2 rounded-lg">
                    <Image
                      src={sourceIcon(dt.source)}
                      width={60}
                      height={60}
                      alt="review source"
                      className="absolute top-2 right-3"
                    />
                    <Image
                      src="/quote.png"
                      width={30}
                      height={30}
                      alt=""
                      className="w-[20px] "
                    />
                    <p className="text-[12px] xl:text-[14px] font-[400] text-justify">
                      {dt.review}
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
            <button className="text-white text-2xl sm:text-3xl bg-[#F15C5A] rounded-full w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] nextBtn">
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </TestimonialStyle>
  );
};

export default Testimonials;
