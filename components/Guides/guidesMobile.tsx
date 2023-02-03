import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  Navigation,
  A11y,
  Lazy,
  EffectFade,
  Controller
} from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import NextIcon from '../../assets/svg/nexticon.svg';
SwiperCore.use([Autoplay, Navigation, Lazy, A11y, EffectFade, Controller]);
interface IProps {
  guidesData: any;
}
const GuidesMobile = ({ guidesData }: IProps) => {
  const [controlledSwiper, setControlledSwiper] = useState<any>({});
  if (!guidesData) {
    return <div>Loading...</div>;
  }
  return (
    <div
      id="guides_wrapper"
      className="border-[1px] border-[#C5C5C5] shadow-guidesBox relative "
    >
      <div
        id="top-guides-wrapper"
        className="w-[85%] xsm:max-h-[70%] md:max-h-[100%] h-[70%] mx-auto"
      >
        <Swiper
          id="top-slider"
          slidesPerView={1}
          spaceBetween={1}
          lazy={{ loadPrevNext: true, checkInView: true }}
          a11y={{ itemRoleDescriptionMessage: 'Showing all our Guides' }}
          modules={[Controller]}
          controller={{ control: controlledSwiper }}
          grabCursor
          // autoplay={{
          //   delay: 1000,
          //   disableOnInteraction: false
          // }}
          observer
          observeParents
          observeSlideChildren
          resizeObserver
          updateOnWindowResize
          setWrapperSize
          slideToClickedSlide
          className="xsm:max-h-[400px] sm:max-h-[500px] h-[100%] !overflow-y-auto"
        >
          {guidesData &&
            guidesData.length > 0 &&
            guidesData?.map((guide: any, index: number) => (
              <SwiperSlide key={guide?.id} className="py-10">
                <div className="xsm:max-h-[400px] sm:max-h-[500px]  overflow-y-auto">
                  <div id="guide-bio" className="inline-block">
                    <Image
                      src={guide?.professional[0]?.url}
                      width={160}
                      height={137}
                      alt={guide?.professional[0]?.alt}
                      className=" ml-5 mr-2 mt-10 float-left border-[7px] border-[#FFFFFF] rounded-[5px] shadow-guideimageBox"
                    />
                    <h3 className="xsm:text-[14px] sm:text-[30px] font-[700]">
                      {guide?.firstName.toUpperCase()}
                    </h3>
                    <p className="inline text-[#828282] overflow-auto xsm:text-[12px] sm:text-[20px] font-[500] px-3 ">
                      {`${guide?.biography}`}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div
        id="bottom-guides-wrapper"
        className="xsm:max-w-[285px] xsm:max-h-[100px] sm:max-w-[293px] sm:max-h-[125px] w-[100%] h-[100%] px-5 rounded-[10px] shadow-moreguideBox absolute xsm:top-[92%] sm:top-[88%] md:top-[88%] lg:top-[92%] xsm:left-[28%] sm:left-[40%] md:left-[42%] lg:left-[57%] xl:left-[64%] bg-[#FFFFFF] z-20"
      >
        <div className="xsm:pt-1 sm:pt-2">
          <div className="relative">
            <h4 className="xsm:text-[14px] sm:text-[22px] text-[#000000] font-[500]">
              More Guides
            </h4>
            <Swiper
              id="bottom-slider"
              slidesPerView={5}
              spaceBetween={1}
              grabCursor
              lazy={{ loadPrevNext: true, checkInView: true }}
              a11y={{ itemRoleDescriptionMessage: 'Showing all our Guides' }}
              modules={[Controller]}
              onSwiper={swiper => setControlledSwiper({ control: swiper })}
              loop
              navigation={{
                nextEl: '.nextButton'
              }}
              observer
              observeParents
              observeSlideChildren
              resizeObserver
              updateOnWindowResize
              setWrapperSize
              slideToClickedSlide
              className="rounded-[5px]"
            >
              {guidesData &&
                guidesData.length > 0 &&
                guidesData?.map((guide: any, index: number) => (
                  <SwiperSlide key={guide?.id}>
                    <div
                      id="image-wrapper"
                      className="xsm:w-[67px] xsm:h-[60px] sm:w-[55px] sm:h-[65px] relative overflow-hidden rounded-[5px]"
                    >
                      <Image
                        src={guide?.professional[0]?.url}
                        fill
                        alt={guide?.professional[0]?.alt}
                        className="object-cover rounded-[5px] w-[100%] h-[100%]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              <div className="xsm:w-[50px] xsm:h-[60px] sm:w-[55px] sm:h-[65px] bg-[#000000cc] absolute top-0 right-0 z-50 rounded-[5px] flex justify-center items-center">
                <div className="bg-[#F15C5A] xsm:w-[30px] h-[30px] rounded-[154px] flex justify-center items-center nextButton">
                  <NextIcon />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesMobile;
