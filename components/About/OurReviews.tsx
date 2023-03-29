import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { TESTIMONIALS, TESTIMONIAL_INTERFACE } from '../../api/testimonials';
import ReviewCard from '../Reviews/ReviewCard';
SwiperCore.use([Navigation]);
const OurReviews = () => {
  const {
    data: { reviews = [] } = {},
    loading,
    error
  } = useQuery<TESTIMONIAL_INTERFACE>(TESTIMONIALS);
  //reviews with max 120 characters
  const filterReviews = reviews?.filter((review: any) => {
    if (review?.review !== null) {
      return review?.rating === 5 && review?.review.length < 120;
    }
  });
  console.log(filterReviews);

  return (
    <div className="mt-5 mx-40">
      <h1 className=" text-[36px] font-[600] text-[#333333]">Our Reviews</h1>
      <Swiper
        slidesPerView={1}
        grabCursor
        navigation={{
          nextEl: '.nextButton',
          prevEl: '.prevButton'
        }}
        loop
      >
        {filterReviews.map((review: Record<string, any>) => (
          <SwiperSlide key={review?.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-right mt-5">
        <button className="bg-[#CCCCCC] text-white w-10 h-10 rounded-full prevButton">{`<`}</button>
        <button className="bg-[#F15C5A] text-white w-10 h-10 ml-2 rounded-full nextButton">{`>`}</button>
      </div>
    </div>
  );
};

export default OurReviews;
