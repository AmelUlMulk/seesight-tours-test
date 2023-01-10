import { useState } from 'react';
import styled from 'styled-components'
import Image from 'next/image';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import 'swiper/css/a11y';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
 
const ProgressPagination=styled.div`
    
`
const Carousel = ({ imagesArr }: any) => {
  const [keyValue, setKeyValue] = useState<number>(1);
  return (
    <div id="product_swiper">
      <Swiper
        key={keyValue}
        slidesPerView={1}
        navigation={imagesArr.length > 1 && true}
        watchSlidesProgress
        observer
        observeParents
        observeSlideChildren
        updateOnWindowResize
        slideToClickedSlide
        preloadImages
        pagination={{
            clickable: true,
            // eslint-disable-next-line object-shorthand
            renderBullet: function (index, className) {
              return `<div class="${className}"><div style="--dur:${
                imagesArr[index]?.duration / 1000 + 0.3
              }s" class="bullets"></div></div>`;
            },
          }}
        autoplay={{
          stopOnLastSlide: false,
          disableOnInteraction: false
        }}
        onReachEnd={() =>
          setTimeout(
            () => {
              setKeyValue(Math.random());
            },
            imagesArr[imagesArr.length - 1]?.isVideo ? 4000 : 5000 + 500
          )
        }
      >
        {imagesArr.map((image: any) => (
          <SwiperSlide key={image.key} data-swiper-autoplay={image.duration}>
            {image.video ? (
              <video
                id="carouselVideo"
                src={image.imageURL}
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <div >
                <Image src={image.imageURL} width={500} height={500} alt="" className='min-w-[100%]'/>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
