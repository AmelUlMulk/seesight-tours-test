/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ATTRACTION_INTERFACE } from '../../api/commonInterfaces';
import Image from 'next/image';
import Card from '../Card';
type INCLUDED = {
  data: string[];
  attractions: [ATTRACTION_INTERFACE];
};

const Included = ({ data, attractions }: INCLUDED) => {
  const ref = useRef(null);

  return (
    <>
      <div
        className="2xl:px-[10%]  w-full flex flex-col justify-between py-4"
        ref={ref}
      >
        <h1 id="whatsincluded" className="text-5xl font-extrabold mb-6 ">
          What's Included
        </h1>
        <ul className=" list-disc w-3/4 ">
          {data.map(item => (
            <li key={item} className="py-4 text-2xl   ">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="2xl:pl-[10%]  flex flex-col justify-between py-4 w-full">
        <h1 className="text-5xl font-extrabold mb-6 " id="what-you-will-see">
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
        <h1 id="to-do" className="text-5xl font-extrabold my-6 ">
          What you’ll do
        </h1>
        <ul className="w-3/4 ">
          {data.map(item => (
            <div key={item} className="flex gap-4 items-center w-full">
              <Image
                src="/hand.png"
                width={30}
                height={20}
                alt="hand-icon"
                className=" max-h-6 "
              />
              <li className="py-4 text-2xl w-[95%]   ">{item}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Included;
