import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Our_Reviews, TESTIMONIAL_INTERFACE } from '../../api/testimonials';
import ReviewCard from '../Reviews/ReviewCard';
SwiperCore.use([Navigation]);
const OurReviews = () => {
  const {
    data: { reviews = [] } = {},
    loading,
    error
  } = useQuery<TESTIMONIAL_INTERFACE>(Our_Reviews);
  //reviews with max 120 characters
  const filterReviews = reviews?.filter((review: any) => {
    if (review?.review !== null) {
      return review?.rating === 5 && review?.review.length < 120;
    }
  });

  return (
    <div className="mt-5 w-[90%] mx-auto">
      <h2 className=" text-[18px] sm:text-[26px] lg:text-[36px] font-[600] text-[#333333]">
        Our Reviews
      </h2>
      <Swiper
        slidesPerView={1}
        grabCursor
        navigation={{
          nextEl: '.nextBtn',
          prevEl: '.prevBtn'
        }}
        loop
      >
        {filterReviews.map((review: Record<string, any>) => (
          <SwiperSlide key={review?.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-right sm:mt-5">
        <button className="bg-[#CCCCCC] text-white text-[16px] sm:text-[20px] w-8 h-8 sm:w-10 sm:h-10 rounded-full prevBtn">{`<`}</button>
        <button className="bg-[#F15C5A] text-white text-[16px] sm:text-[20px] w-8 h-8 sm:w-10 sm:h-10 ml-3 sm:ml-5 rounded-full nextBtn">{`>`}</button>
      </div>
    </div>
  );
};

export default OurReviews;
