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
  const [firstSwiper, setFirstSwiper] = useState<any>(null);
  const [secondSwiper, setSecondSwiper] = useState<any>(null);
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
          onSwiper={setControlledSwiper}
          loop={true}
          loopedSlides={guidesData?.length}
          lazy={{ loadPrevNext: true, checkInView: true }}
          a11y={{ itemRoleDescriptionMessage: 'Showing our Guide information' }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="xxsm:max-h-[370px] xsm:max-h-[390px] sm:max-h-[500px] h-[100%] !overflow-y-auto"
        >
          {guidesData &&
            guidesData.length > 0 &&
            guidesData?.map((guide: any, index: number) => (
              <SwiperSlide key={guide?.id} className="py-10">
                <div
                  id="guide-bio"
                  className="xxsm:max-h-[270px] xsm:max-h-[298px] sm:max-h-[318px]  overflow-y-auto"
                >
                  <div className="relative xxsm:w-[120px] xxsm:h-[130px]  sm:w-[170px] sm:h-[180px] float-left mr-8 mb-[16px] ">
                    <Image
                      src={guide?.professional[0]?.url}
                      // width={140}
                      // height={110}
                      fill
                      alt={guide?.professional[0]?.alt}
                      className=" ml-5 mt-5 border-[7px] xxsm:h-[130px] xsm:h-[150px] sm:h-[100%] border-[#FFFFFF] rounded-[5px] shadow-guideimageBox"
                    />
                  </div>
                  <div className="text-justify">
                    <h3 className="xsm:text-[16px] sm:text-[22px] font-[600]">
                      {guide?.firstName.toUpperCase()}
                    </h3>
                    <p className="text-[#828282] text-right overflow-auto text-[12px] sm:text-[14px] font-[400] pl-5 inline ">
                      {`${guide?.biography}`}
                    </p>
                  </div>

                  {/* </div> */}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div
        id="bottom-guides-wrapper"
        className="xxsm:max-w-[220px] xxsm:max-h-[80px] xsm:max-w-[240px] xsm:max-h-[90px] sm:max-w-[293px] sm:max-h-[125px] w-[100%] h-[100%] px-5 rounded-[10px] shadow-moreguideBox absolute xxsm:top-[90%] xsm:top-[92%] sm:top-[88%] md:top-[88%] lg:top-[92%] xxsm:left-[24%] xsm:left-[28%] xsm:rig-[28%] sm:left-[40%] md:left-[42%] lg:left-[57%] xl:left-[64%] bg-[#FFFFFF] z-20"
      >
        <div className="xsm:pt-2 sm:pt-2">
          <div className="relative">
            <h4 className="xsm:text-[14px] sm:text-[16px] text-[#000000] font-[400]">
              More Guides
            </h4>
            <Swiper
              id="bottom-slider"
              slidesPerView={5}
              spaceBetween={1}
              loop={true}
              loopedSlides={guidesData?.length}
              navigation={{
                nextEl: '.nextButton'
              }}
              lazy={{ loadPrevNext: true, checkInView: true }}
              a11y={{ itemRoleDescriptionMessage: 'Showing all our Guides' }}
              controller={{ control: controlledSwiper }}
              grabCursor
              slideToClickedSlide
              className="rounded-[5px]"
            >
              {guidesData &&
                guidesData.length > 0 &&
                guidesData?.map((guide: any, index: number) => (
                  <SwiperSlide key={guide?.id}>
                    <div
                      id="image-wrapper"
                      className="xxsm:w-[50px] xxsm:h-[43px] xsm:w-[57px] xsm:h-[50px] sm:w-[55px] sm:h-[65px] relative overflow-hidden rounded-[5px]"
                    >
                      <Image
                        src={guide?.professional[0]?.url}
                        fill
                        alt={guide?.professional[0]?.alt}
                        className="object-cover rounded-[5px] w-[100%] h-[80%]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              <div className="xxsm:w-[45px] xxsm:h-[43px] xsm:w-[45px] xsm:h-[50px] sm:w-[55px] sm:h-[65px] bg-[#000000cc] absolute top-0 right-0 z-50 rounded-[5px] flex justify-center items-center">
                <div className="bg-[#F15C5A] w-[30px] h-[30px] rounded-[154px] flex justify-center items-center nextButton">
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
