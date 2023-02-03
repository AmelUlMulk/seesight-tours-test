import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Lazy, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/a11y';
SwiperCore.use([Autoplay, Lazy, A11y]);
interface IProps {
  data: [];
}
const SnippetStyle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardSnippet = (city: any) => {
  const [showSnp, setShowSnp] = useState(false);
  return (
    <>
      {showSnp ? (
        <div
          onClick={() => {
            if (showSnp) {
              setShowSnp(false);
            }
          }}
          onMouseLeave={() => setShowSnp(!showSnp)}
          className="absolute bottom-[8px] left-[12px] right-10 bg-[#000000] opacity-70 text-[#FFFFFF] md:text-[12px] lg:text-[18px] font-[500] md:px-2 lg:px-12 md:py-2 lg:py-5 rounded-lg"
        >
          {city?.city?.cardSnippet}
        </div>
      ) : (
        <div
          onClick={() => {
            if (!showSnp) {
              setShowSnp(true);
            }
          }}
          onMouseEnter={() => setShowSnp(!showSnp)}
          className="absolute w-[78%] bottom-[8px] left-[12px] bg-[#000000] opacity-70 text-[#FFFFFF] md:text-[13px] lg:text-[18px] font-[500] px-4 py-2 rounded-lg"
        >
          {city?.city?.name}
        </div>
      )}
    </>
  );
};
const CitiesSwiper = ({ data }: IProps) => {
  return (
    <Swiper
      id="cities_swiper"
      className="mt-5"
      slidesPerView="auto"
      spaceBetween={20}
      grabCursor
      lazy={{
        loadPrevNext: true,
        checkInView: true
      }}
      breakpoints={{
        226: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 10
        }
      }}
    >
      {data &&
        data.map((city: Record<string, any>) => {
          return (
            <SwiperSlide
              id="cities_swiper-slide"
              key={city?.city.id}
              className="w-[235px] h-[295px]"
            >
              <div
                id="image-wrapper"
                className="w-[] h-[295px] relative rounded-lg !overflow-hidden"
              >
                <Image
                  src={city?.city?.cardMedia[0]?.url}
                  alt={city?.city?.cardMedia[0]?.alt}
                  // width={400}
                  // height={400}
                  fill
                  className="xxsm:w-[90%] sm:w-[100%] sm:h-[100%] object-cover rounded-lg hover:scale-110 ease-in-out duration-200"
                />
                {CardSnippet(city)}
              </div>

              {/* <div className="flex-none ">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold">{city?.city?.name}</h3>
                    <p className="text-xl">{city?.city?.cardSnippet}</p>
                  </div>
                </div> */}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default CitiesSwiper;
