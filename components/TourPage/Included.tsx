/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ATTRACTION_INTERFACE } from '../../api/commonInterfaces';
import Image from 'next/image';
import Card from '../Card';
import ProductTimeline from './ProductTimeline';
type INCLUDED = {
  data: string[];
  attractions: [ATTRACTION_INTERFACE];
  longDescription: string;
};

const Included = ({ data, attractions, longDescription }: INCLUDED) => {
  const ref = useRef(null);

  return (
    <>
      <div
        className=" px-2 2xl:px-[10%]  w-full flex flex-col justify-between py-2 md:py-4"
        ref={ref}
      >
        <h1
          id="whatsincluded"
          className="  text-xl md:text-4xl font-extrabold md:mb-6 "
        >
          What's Included
        </h1>
        <ul className=" list-disc md:w-3/4  ">
          {data.map(item => (
            //@ts-ignore
            <li key={item} className="py-4  md:text-2xl   ">
              {/*@ts-ignore*/}
              {item.value ? item.value : item}
            </li>
          ))}
        </ul>
      </div>
      <div className=" px-[2%] 2xl:pl-[10%]  flex flex-col justify-between py-4 w-full">
        <h1
          className=" text-xl md:text-4xl font-extrabold mb-6 "
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
        className="2xl:px-[10%]  w-full flex flex-col justify-between py-4"
        ref={ref}
      >
        <h1
          id="to-do"
          className=" px-[2%] text-xl md:text-4xl font-extrabold my-6 "
        >
          What you’ll do
        </h1>

        <ProductTimeline description={longDescription} />
      </div>
    </>
  );
};

export default Included;
