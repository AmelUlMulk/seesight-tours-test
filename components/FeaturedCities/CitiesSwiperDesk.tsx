import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Lazy, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/a11y';
SwiperCore.use([Autoplay, Lazy, A11y]);
interface IProps {
  data: [];
}
const CitiesSwiperDesk = ({ data }: IProps) => {
  return (
    <Swiper
      className="Cities_swiper"
      //   slidesPerView="auto"
      spaceBetween={10}
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
            <SwiperSlide key={city?.city.id} className="Cities_swiper-slide">
              <div className="flex flex-col">
                <div className="image-wrapper object-cover relative w-[160px] h-[200px] rounded-lg !overflow-hidden">
                  <Image
                    src={city?.city?.cardMedia[0]?.url}
                    alt={city?.city?.cardMedia[0]?.alt}
                    fill
                    className="rounded-lg hover:scale-110 ease-in-out duration-200 !overflow-hidden"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">{city?.city?.name}</h3>
                  <p className="text-xl">{city?.city?.cardSnippet}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default CitiesSwiperDesk;
