import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { PAGE_OPTIONS } from '../Trust/Trustbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
SwiperCore.use([Autoplay, Pagination, Navigation]);
interface IProps {
  product: Record<string, any>;
  productType?: string;
}
const StyledSwiper = styled(Swiper)`
  // Set the desired styles for the Swiper slider here
  .swiper-pagination-bullet-active {
    background-color: #fd4c5c;
  }
`;
const PriceContainerStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
  text-align: center;
  background-color: #f15c5a;
  border: none;
  z-index: 10;
`;
export const SnippetStyle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const TourCard = ({ product, productType }: IProps) => {
  const [image, setImage] = useState<any>([]);

  //storing Images in array
  useEffect(() => {
    const imageArr: Array<Record<string, any>> = [];
    product?.carousel.map((img: Record<string, any>, index: number) => {
      imageArr.push({
        key: index + 1,
        imageUrl: img?.url,
        hasVideo: img?.type.public_id.includes('video')
      });
      setImage(imageArr);
    });
  }, [product?.carousel]);
  // REVIEWS AVG
  let totalAvg = 0;
  let total = 0;
  if (product?.reviews) {
    product?.reviews.forEach((review: any) => {
      total += Number(review?.rating);
    });
    totalAvg = Number((total / product?.reviews?.length).toFixed(1));
  }

  return (
    <div
      id="tour-section"
      className="sm:mt-5 lg:mt-10 relative flex flex-col bg-[#FFFF] rounded-lg"
    >
      <div className="xsm:h-[250px] sm:h-[260px] lg:h-[260px] xl:h-[300px] w-[95%] py-2 mx-auto relative">
        <Link href={`/tours/${product?.slug}`} className="rounded-md h-[100%]">
          <div className="w-[100%] h-[100%] relative rounded-lg !overflow-hidden">
            <PriceContainerStyle
              id="price_container"
              className="py-1 lg:py-1 px-3 lg:px-5 2xl:px-6 text-[12px] lg:text-[14px] 2xl:text-[18px] font-[700] rounded-[3px]"
            >
              ${product?.price}
            </PriceContainerStyle>
            {product?.cardMessage && (
              <p className="absolute top-0 left-0 max-w-[130px] lg:max-w-[110px] xl:max-w-[170px] py-2 px-1 xsm:px-2 text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#ffffff] font-[700] bg-[#f15c5a] z-30 rounded-[5px]">
                {product?.cardMessage.length > 30
                  ? `${product.cardMessage.slice(0, 27).toUpperCase()}...`
                  : product.cardMessage.toUpperCase()}
              </p>
            )}
            <StyledSwiper
              slidesPerView={1}
              spaceBetween={1}
              navigation
              // autoplay={{
              //   delay: 4000,
              //   disableOnInteraction: false
              // }}
              pagination={{
                dynamicBullets: false,
                clickable: true
              }}
              className="w-[100%] h-[100%]"
            >
              {image?.map((img: any, index: number) => (
                <SwiperSlide key={index} className="w-[100%] h-[100%]">
                  {img?.hasVideo ? (
                    <video
                      src={img?.imageUrl}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-[100%] h-[100%] object-cover"
                    ></video>
                  ) : (
                    <Image
                      src={img?.imageUrl}
                      width={400}
                      height={400}
                      alt="feature product image"
                      className="w-[100%] h-[100%] object-cover rounded-lg hover:scale-105 ease-in-out duration-200"
                    />
                  )}
                </SwiperSlide>
              ))}
            </StyledSwiper>
          </div>
        </Link>

        <div className="absolute top-[94%] w-[100%] mx-auto z-30">
          <div id="rating_container" className="w-[96%] mx-auto">
            <div className="flex justify-between bg-[#E4F6F1] rounded-[5px] py-2 px-2">
              <div id="tour-time">
                <p className="text-[#000000] text-[14px] font-[400]">
                  {productType !== PAGE_OPTIONS.MULTIDAY_TOUR_PAGE
                    ? product?.duration && `${product?.duration} Hours`
                    : `${Number(product?.duration) / 24} Days`}
                </p>
              </div>
              {product?.reviews?.length > 0 && (
                <div className="flex px-2">
                  <p className="px-1 text-[#FF9921] text-[14px] font-[500]">{`${totalAvg}/5`}</p>
                  <Image
                    src="/homestar.svg"
                    width={15}
                    height={15}
                    alt="rating star"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[25px] lg:h-[30px] xl:h-[30px]"></div>

      <div
        id="description"
        className="flex flex-col w-[95%] mx-auto xsm:h-[100px] md:h-[130px] lg:h-[120px] xl:h-[140px]"
      >
        <div id="heading">
          <h2 className="text-[14px] lg:text-[15px] xl:text-[18px] font-[700]">
            {product?.name}
          </h2>
        </div>
        <div id="snippet">
          <SnippetStyle className="text-[12px] lg:text-[15px] xl:text-[18px] text-[#444444] font-[400]">
            {product?.name.length < 120
              ? product?.cardSnippet.length < 115
                ? `${product?.cardSnippet}`
                : `${product?.cardSnippet
                    ?.split('')
                    ?.slice(0, 97)
                    ?.join('')}...`
              : product?.cardSnippet.length < 120
              ? `${product?.cardSnippet}`
              : `${product?.cardSnippet?.split('')?.slice(0, 95)?.join('')}...`}
          </SnippetStyle>
        </div>
      </div>
      <div
        id="checkout_buttons"
        className="flex gap-1 justify-between  mx-auto py-2 w-full "
      >
        <Link
          href={`/tours/${product.slug}`}
          className="flex-none w-[35%]  text-start py-2  md:px-6 lg:px-5 2xl:px-8 text-[#131313] text-[12px] xsm:text-[14px] sm:text-[14px] lg:text-[13px] xl:text-[18px] font-[500] bg-[#FFFFFF] border-[1px] border-[#F15C5A] rounded-[8px] md:rounded-[10px] hover:border-none hover:text-white hover:bg-slate-400"
        >
          <button>See Details</button>
        </Link>

        <button className="flex-none w-[35%] text-[#FFFFFF] font-[500] py-2  sm:px-16 md:px-6 lg:px-5 xl:px-5 2xl:px-8 text-[12px] xsm:text-[14px] sm:text-[14px] lg:text-[13px] xl:text-[18px] bg-[#F15C5A] rounded-[8px] md:rounded-[10px]">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourCard;
