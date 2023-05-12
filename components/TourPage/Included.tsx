/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ATTRACTION_INTERFACE } from '../../api/commonInterfaces';
import Image from 'next/image';

import { Rating } from 'react-simple-star-rating';

import styled from 'styled-components';
import dynamic from 'next/dynamic';

const DateAndPax = dynamic(() => import('../CalendarAndPax/DateAndPax'));
const TourBasics = dynamic(() => import('./TourBasics'));
const ProductTimeline = dynamic(() => import('./ProductTimeline'));
const Card = dynamic(() => import('../Card'));

const StyledStar = styled(Rating)`
  @media (max-width: 768px) {
    .star-svg {
      width: 30px;
    }
  }
`;
type INCLUDED = {
  data: string[];
  attractions: [ATTRACTION_INTERFACE];
  longDescription: string;
  rezdyId: string;
  reviewState: {
    average: number;
    total: number;
  };
  updateTourContext: () => void;
  duration: number;
  showPax: boolean;
};

const Included = ({
  data,
  attractions,
  longDescription,
  rezdyId,
  reviewState,
  updateTourContext,
  duration,
  showPax
}: INCLUDED) => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stopPosition, setStopPosition] = useState<number>(0);
  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const stopPosition = containerHeight - 900;

      setStopPosition(stopPosition);
    }
  }, []);

  return (
    <>
      <div
        className="flex justify-center lg:justify-start  flex-wrap flex-row-reverse items-start md:gap-6  w-full  "
        ref={containerRef}
      >
        <div className=" relative mmd:sticky  mmd:top-[100px]  z-50   min-w-[350px]   mmd:w-[25%] w-full     p-3   mmd:mb-[300px] rounded-lg  shadow-none mmd:shadow-xl     ">
          <DateAndPax
            rezdyId={rezdyId}
            updateTourContext={updateTourContext}
            mobile={false}
          />
          <div className=" flex flex-col md:flex-row md:items-center relative   mmd:absolute mmd:-bottom-[150px] min-w-full      items-start">
            <div className=" flex mmd:hidden w-full  items-start md:w-1/2 ">
              <TourBasics duration={duration} />
            </div>
            <div className="mt-8">
              <h3 className="  md:text-xl font-medium ">
                Over {reviewState.total} Reviews
              </h3>
              <div className="flex mt-2 items-center  justify-between w-full gap-4  ">
                <Image
                  src="/tripadvisor.png"
                  width={70}
                  height={80}
                  alt="trip-advisor"
                  className=" w-12 "
                />
                <div className="flex flex-col pl-4  border-l border-gray-300 ">
                  <StyledStar
                    SVGstyle={{
                      display: 'inline-block',
                      textAlign: 'center'
                    }}
                    readonly
                    allowFraction
                    initialValue={reviewState.average}
                  />
                  <p className=" text-sm md:text-base" id="mobile-pax">
                    As recommended by 99% of Users on Trip advisor
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showPax && (
            <div
              className={`${
                showPax ? 'block' : 'hidden'
              } my-10 py-4  w-full bg px-2 bg-white mmd:hidden  `}
            >
              <DateAndPax
                rezdyId={rezdyId}
                updateTourContext={updateTourContext}
                mobile={true}
              />
            </div>
          )}
        </div>

        <div className="   md:w-full mmd:w-[60%] lg:w-[60%] xl:w-[70%] ">
          <div
            className=" w-full    flex flex-col justify-between py-2 md:py-4 relative"
            ref={ref}
          >
            <h2
              id="whatsincluded"
              className="  text-xl md:text-[28px]  font-extrabold  "
            >
              What's Included
            </h2>
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
          <div className=" flex flex-col justify-between py-4 w-full max-w-[100vw]">
            <h2
              className=" text-xl md:text-[28px] font-extrabold mb-6 "
              id="what-you-will-see"
            >
              What you'll see
            </h2>
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
            <h2
              id="to-do"
              className="  text-xl md:text-[28px] font-extrabold my-6 "
            >
              What you’ll do
            </h2>
          </div>

          <ProductTimeline description={longDescription} />
        </div>
      </div>
    </>
  );
};

export default Included;
