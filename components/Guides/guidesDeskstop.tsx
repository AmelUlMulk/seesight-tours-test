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
const GuidesDesk = ({ guidesData }: IProps) => {
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
        className="w-[85%] max-h-[100%] h-[70%] mx-auto"
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
        >
          {guidesData &&
            guidesData.length > 0 &&
            guidesData?.map((guide: any, index: number) => (
              <SwiperSlide key={guide?.id} className="py-10">
                <div className="flex gap-2 py-10 ">
                  <div className="flex-none w-[40%]">
                    <div
                      id="image-wrapper"
                      className="flex-none w-[100%] h-[90%] pl-[12px]"
                    >
                      <Image
                        src={guide?.professional[0]?.url}
                        width={491}
                        height={504}
                        alt={guide?.professional[0]?.alt}
                        className="w-[100%] h-[100%] border-[7px] border-[#FFFFFF] rounded-[5px] shadow-guideimageBox"
                      />
                    </div>
                  </div>

                  <div
                    id="guide-bio"
                    className="flex-none w-[60%] max-h-[100%] h-[100%] px-5 absolute top-[30px] right-0"
                  >
                    <h3 className="text-[46px] font-[700]">
                      {guide?.firstName} {guide?.lastName}
                    </h3>
                    <p className="text-[#828282] max-h-[400px] h-[100%] overflow-auto text-[20px] font-[500] px-3 ">{`${guide?.biography}`}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div
        id="bottom-guides-wrapper"
        className="max-w-[442px] max-h-[153px] w-[100%] h-[100%] rounded-[10px] px-5 shadow-moreguideBox absolute top-[92%] left-[64%] bg-[#FFFFFF]"
      >
        <div className="relative">
          <h4 className="text-[22px] text-[#000000] font-[500]">More Guides</h4>
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
                    className="min-w-[85px] min-h-[87px] w-[100%] h-[100%] relative rounded-[5px]"
                  >
                    <Image
                      src={guide?.professional[0]?.url}
                      fill
                      alt={guide?.professional[0]?.alt}
                      className="object-cover rounded-[5px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            <div className="w-[85px] h-[87px] bg-[#000000cc] absolute top-0 right-0 z-50 rounded-[5px] flex justify-center items-center">
              <div className="bg-[#F15C5A] w-[37px] h-[37px] rounded-[154px] flex justify-center items-center nextButton">
                <NextIcon />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GuidesDesk;
