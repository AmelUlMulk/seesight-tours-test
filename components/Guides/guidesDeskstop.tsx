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
import { optimizeImageUrl } from '../../utils/videoLinkOptimize';
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
      className="border-[1px] border-[#C5C5C5] shadow-guidesBox relative  mt-6"
    >
      <div
        id="top-guides-wrapper"
        className="w-[80%] max-h-[100%] h-[70%] mx-auto"
      >
        <Swiper
          id="top-slider"
          slidesPerView={1}
          spaceBetween={1}
          onSwiper={setControlledSwiper}
          loop={true}
          loopedSlides={guidesData?.length}
          lazy={{ loadPrevNext: true, checkInView: true }}
          a11y={{ itemRoleDescriptionMessage: 'Showing our Guide information' }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
        >
          {guidesData &&
            guidesData.length > 0 &&
            guidesData?.map((guide: any, index: number) => (
              <SwiperSlide key={guide?.id} className="py-10">
                <div className="flex gap-2 py-10 max-h-[400px] lg:max-h-[400px] 2xl:max-h-[500px]">
                  <div className="flex-none md:w-[42%] lg:w-[36%] xl:w-[30%] 2xl:w-[35%] 3xl:w-[30%]">
                    <div
                      id="image-wrapper"
                      className="flex-none w-[100%] h-[100%] pl-[12px]"
                    >
                      <Image
                        src={guide?.professional[0]?.url}
                        width={321}
                        height={300}
                        alt={guide?.professional[0]?.alt}
                        className="w-[100%] h-[100%] 2xl:w-[95%] md:h-[95%] lg:h-[100%] 2xl:h-[97%] 3xl:h-[100%] border-[7px] border-[#FFFFFF] rounded-[5px] shadow-guideimageBox"
                      />
                    </div>
                  </div>

                  <div
                    id="guide-bio"
                    className="flex-none md:w-[58%] lg:w-[64%] xl:w-[70%] 2xl:w-[65%] 3xl:w-[70%] px-5 md:max-h-[240px] lg:max-h-[260px] xl:max-h-[300px] 2xl:max-h-[500px] overflow-auto  right-0"
                  >
                    <h3 className="text-[16px] sm:text-[22px] lg:text-[28px] font-[600]">
                      {guide?.firstName.toLocaleUpperCase()} {guide?.lastName}
                    </h3>
                    <p className="text-[#828282] text-justify md:max-h-[240px] lg:max-h-[260px] xl:max-h-[300px] 2xl:max-h-[500px] h-[100%] overflow-auto text-[12px] sm:text-[14px] lg:text-[20px] font-[400] pl-1 pr-5 ">{`${guide?.biography}`}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div
        id="bottom-guides-wrapper"
        className="z-50 md:max-w-[442px] md:max-h-[150px] lg:max-w-[442px] lg:max-h-[153px] 2xl:max-w-[582px] 2xl:max-h-[193px] w-[100%] h-[100%] px-5 rounded-[10px] shadow-moreguideBox absolute xsm:top-[92%] md:top-[88%] lg:top-[92%] 2xl:top-[84%] xsm:left-[25%] md:left-[35%] lg:left-[57%] xl:left-[64%] bg-[#FFFFFF]"
      >
        <div className=" md:pt-2 lg:pt-3">
          <div>
            <h4 className="text-[22px] text-[#000000] font-[500]">
              More Guides
            </h4>
            <Swiper
              id="bottom-slider"
              slidesPerView="auto"
              spaceBetween={1}
              loop={true}
              loopedSlides={guidesData?.length}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: '.nextButton'
              }}
              lazy={{ loadPrevNext: true, checkInView: true }}
              a11y={{ itemRoleDescriptionMessage: 'Showing all our Guides' }}
              controller={{ control: controlledSwiper }}
              grabCursor
              slideToClickedSlide
              className="rounded-[5px]"
              breakpoints={{
                768: {
                  slidesPerView: 4
                },
                1024: {
                  slidesPerView: 5
                }
              }}
            >
              {guidesData &&
                guidesData.length > 0 &&
                guidesData?.map((guide: any, index: number) => (
                  <SwiperSlide key={guide?.id}>
                    <div
                      id="image-wrapper"
                      className="md:min-w-[120px] md:min-h-[85px] lg:min-w-[85px] lg:min-h-[80px] xl:min-w-[85px] xl:min-h-[87px] 2xl:min-w-[115px] 2xl:min-h-[107px] w-[100%] h-[100%] relative rounded-[5px] 2xl:mt-3"
                    >
                      <Image
                        src={optimizeImageUrl(guide?.professional[0]?.url)}
                        fill
                        alt={guide?.professional[0]?.alt}
                        className="object-cover rounded-[5px]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              <div className="md:min-w-[100px] md:min-h-[85px] lg:min-w-[85px] lg:min-h-[80px] xl:min-w-[85px] xl:min-h-[87px] 2xl:min-w-[115px] 2xl:min-h-[107px] 2xl:mt-3  bg-[#000000cc] absolute top-0 right-0 z-50 rounded-[5px] flex justify-center items-center">
                <div className="bg-[#F15C5A] w-[37px] h-[37px] rounded-[154px] flex justify-center items-center nextButton">
                  <NextIcon className="hover:cursor-pointer" />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesDesk;
