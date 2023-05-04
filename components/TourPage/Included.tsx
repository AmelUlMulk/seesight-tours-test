/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ATTRACTION_INTERFACE } from '../../api/commonInterfaces';
import Image from 'next/image';
import Card from '../Card';
import { Rating } from 'react-simple-star-rating';
import ProductTimeline from './ProductTimeline';
import DateAndPax from '../CalendarAndPax/DateAndPax';
type INCLUDED = {
  data: string[];
  attractions: [ATTRACTION_INTERFACE];
  longDescription: string;
  rezdyId: string;
  reviewState: {
    average: number;
    total: number;
  };
};

const Included = ({
  data,
  attractions,
  longDescription,
  rezdyId,
  reviewState
}: INCLUDED) => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stopPosition, setStopPosition] = useState<number>(0);
  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const stopPosition = containerHeight - 900;
      console.log('the stop position', stopPosition);
      setStopPosition(stopPosition);
    }
  }, []);

  return (
    <>
      <div
        className="flex justify-end  flex-wrap flex-row-reverse items-start gap-6 "
        ref={containerRef}
      >

        <div className=" sticky w-[10%] top-[100px] z-50   min-w-[350px]   bg-white p-3  mb-[300px] rounded-lg  shadow-xl     ">
          <DateAndPax rezdyId={rezdyId} />
          <div className=" absolute -bottom-[150px]   w-full">
            <h3 className="text-xl font-medium ">
              Over {reviewState.total} Reviews
            </h3>
            <div className="flex mt-2 items-center  justify-between w-full gap-4  ">
              <Image
                src="/tripadvisor.png"
                width={70}
                height={80}
                alt="trip-advisor"
              />
              <div className="flex flex-col pl-4  border-l border-gray-300 ">
                <Rating
                  SVGstyle={{
                    display: 'inline-block'
                  }}
                  readonly
                  allowFraction
                  initialValue={reviewState.average}
                />
                <p className="text-base">
                  As recommended by 99% of Users on Trip advisor
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" 2xl:w-[70%]  ">
          <div
            className=" w-full    flex flex-col justify-between py-2 md:py-4 relative"
            ref={ref}
          >
            <h1
              id="whatsincluded"
              className="  text-xl md:text-[28px]  font-extrabold  "
            >
              What's Included
            </h1>
            <ul className="  md:w-11/12 ">
              {data.map(item => (
                <div className="flex items-start gap-2 mt-2 " key={item}>
                  <Image
                    src="/tickmark.png"
                    width={15}
                    height={15}
                    alt="tick mark"
                    className="mt-2"
                  />
                  <li key={item} className="pb-2  md:text-xl   ">
                    {/*@ts-ignore*/}
                    {item.value ? item.value : item}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="   flex flex-col justify-between py-4 w-full">
            <h1
              className=" text-xl md:text-[28px] font-extrabold mb-6 "
              id="what-you-will-see"
            >
              What you'll see
            </h1>
            <Swiper
              className="swiper_123 relative w-full "
              spaceBetween={40}
              slidesPerView={1}
              pagination={{ clickable: true }}
              effect="slide"
              grabCursor
              a11y={{ enabled: true }}
              observer
              observeParents
              observeSlideChildren
              breakpoints={{
                300: {
                  slidesPerView: 1.3
                },
                400: {
                  slidesPerView: 1.3
                },
                800: {
                  slidesPerView: 1.8
                },
                1200: {
                  slidesPerView: 2.8
                }
              }}
            >
              {attractions.map(attraction => {
                if (attraction.cardMediaAlt[0]?.url)
                  return (
                    <SwiperSlide key={attraction.name} className="w-full">
                      <Card
                        slug={attraction.slug}
                        image={attraction.cardMediaAlt[0].url}
                        cardSnippet={attraction.cardSnippet}
                        city={attraction.name}
                      />
                    </SwiperSlide>
                  );
              })}
            </Swiper>
          </div>
          <div
            className="  w-full flex flex-col justify-between py-4"
            ref={ref}
          >
            <h1
              id="to-do"
              className="  text-xl md:text-[28px] font-extrabold my-6 "
            >
              What you’ll do
            </h1>
          </div>


          <ProductTimeline description={longDescription} />
        </div>
      </div>
    </>
  );
};

export default Included;
