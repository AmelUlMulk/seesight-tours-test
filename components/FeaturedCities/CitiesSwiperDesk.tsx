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
const CitiesSwiperDesk = ({ data }: IProps) => {
  return (
    <Swiper
      className="Cities_swiper"
      //   slidesPerView="auto"
      spaceBetween={20}
      grabCursor
      lazy={{
        loadPrevNext: true,
        checkInView: true
      }}
      breakpoints={{
        576: {
          slidesPerView: 4,
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
              className="mb-10 "
            >
              <div className="flex flex-col h-[600px]">
                <div
                  id="image-wrapper"
                  className="flex-none w-[100%] h-[55%] object-cover relative  rounded-lg !overflow-hidden"
                >
                  <Image
                    src={city?.city?.cardMedia[0]?.url}
                    alt={city?.city?.cardMedia[0]?.alt}
                    width={600}
                    height={600}
                    className="w-[100%] h-[100%] rounded-lg hover:scale-110 ease-in-out duration-200 !overflow-hidden"
                  />
                </div>
                <div className="flex-none ">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold">{city?.city?.name}</h3>
                    <p className="text-xl">{city?.city?.cardSnippet}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default CitiesSwiperDesk;
