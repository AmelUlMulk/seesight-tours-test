import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  console.log('showSnp:', showSnp);
  return (
    <>
      <div
        className={`absolute left-0 ${
          showSnp && 'right-0'
        } bottom-0 bg-[#000000] opacity-70 rounded-[5px]
         py-1 xl:py-2 px-2 lg:px-4`}
        onClick={() => {
          if (!showSnp) {
            setShowSnp(!showSnp);
          } else {
            router.push(`${city?.city.slug}`);
          }
        }}
        onMouseLeave={() => setShowSnp(false)}
      >
        <div
          className={` bottom-0 left-0 text-[#ffffff] text-[14px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[24px] 2xl:text-[28px] font-[500] ${
            showSnp && 'width-[100%]'
          }`}
        >
          {city?.city?.name}
        </div>

        {showSnp && (
          <div
            className={` w-[100%] text-[#FFFFFF] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] font-[400] ${
              showSnp && 'pb-2'
            } `}
          >
            {city?.city?.cardSnippet}
          </div>
        )}
      </div>
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
          slidesPerView: 1.3,
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
              className=" h-[295px]"
            >
              <div
                id="image-wrapper"
                className="h-[260px] xsm:h-[295px] relative rounded-lg !overflow-hidden"
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
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default CitiesSwiper;
