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

const data = [
  {
    id: 'A111',
    review:
      'Took my husband for our anniversary.   It is well worth the price you can’t complain.   Our tour guy well educated us on the history very informative.   Will do again thanks.',
    traveller: 'Josephine_G'
  },
  {
    id: 'A112',
    review:
      'We had a great time and would recommend it to anyone. Unfortunately; we couldn’t do the cruise due to winter; but the helicopter was a real highlight ',
    traveller: 'Peter'
  },
  {
    id: 'A113',
    review:
      'Vinny was an amazing guide and shared a ton of local knowledge. We had a lot of fun and met some new friends! Highly recommend thiis tour and especially Vinny! ',
    traveller: 'Eric b'
  },
  {
    id: 'A114',
    review:
      'Vinny was an amazing guide and shared a ton of local knowledge. We had a lot of fun and met some new friends! Highly recommend thiis tour and especially Vinny! ',
    traveller: 'Eric b'
  },
  {
    id: 'A115',
    review:
      'Vinny was an amazing guide and shared a ton of local knowledge. We had a lot of fun and met some new friends! Highly recommend thiis tour and especially Vinny! ',
    traveller: 'Eric b'
  },
  {
    id: 'A116',
    review:
      'Vinny was an amazing guide and shared a ton of local knowledge. We had a lot of fun and met some new friends! Highly recommend thiis tour and especially Vinny! ',
    traveller: 'Eric b'
  },
  {
    id: 'A117',
    review:
      'Vinny was an amazing guide and shared a ton of local knowledge. We had a lot of fun and met some new friends! Highly recommend thiis tour and especially Vinny! ',
    traveller: 'Eric b'
  }
];
const Testimonials = () => {
  return (
    <TestimonialStyle
      id="testimonials"
      className="py-10 px-10 bg-no-repeat bg-cover my-10"
    >
      <div className="px-10">
        <TextShadow className="text-[60px] font-[600] shadow-textShadow">
          Testimonials
        </TextShadow>
      </div>
      <div id="slider-container" className="px-16">
        <div id="slider-grid" className="flex gap-5">
          <div className="flex justify-center items-center">
            <button className="text-white bg-[#F15C5A] rounded-[50%] p-4 prevBtn">
              <PrevslideIcon />
            </button>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            navigation={{
              nextEl: '.nextBtn',
              prevEl: '.prevBtn'
            }}
            loop={true}
            loopFillGroupWithBlank={true}
          >
            {data.map(dt => (
              <SwiperSlide key={dt.id}>
                <div className="flex flex-col relative bg-[#000000] opacity-80  text-white pb-12 px-16 pt-10 rounded-lg">
                  <Image src="/quote.png" width={30} height={30} alt="" />
                  <p>{dt.review}</p>
                  <div
                    className="bg-[#000000] opacity-[80%] w-[30px] h-[30px] absolute top-[100%] left-8"
                    style={{
                      clipPath: 'polygon(0 0, 46% 65%, 100% 0)'
                    }}
                  ></div>
                </div>
                <div className="text-[#FFFFFF] pt-5 pl-5 text-[18px] font-[700]">
                  {dt.traveller}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center items-center">
            <button className="bg-[#F15C5A] text-white rounded-[50%] p-4 nextBtn">
              <NextslideIcon />
            </button>
          </div>
        </div>
      </div>
    </TestimonialStyle>
  );
};

export default Testimonials;
