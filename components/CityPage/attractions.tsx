import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Card from '../Card';

interface ATTRACTIONS {
  name: string;
  attractions: any;
}

const Attractions = ({ name, attractions }: ATTRACTIONS) => {
  console.log('the attarction', attractions);
  return (
    <>
      <div className="pl-[8%] text-start text-4xl  font-bold py-10  pb-14   ">
        <h1 className="text-3xl font-extrabold mb-6 " id="what-you-will-see">
          Best Things to do in {name}
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
              slidesPerView: 2.8
            },
            1200: {
              slidesPerView: 3.8
            }
          }}
        >
          {attractions.map((attraction: any) => {
            if (attraction.heroMedia[0]?.url)
              return (
                <SwiperSlide key={attraction.name} className="w-full">
                  <Card
                    slug={attraction.slug}
                    image={attraction.heroMedia[0].url}
                    cardSnippet={attraction.snippet}
                    city={attraction.name}
                  />
                </SwiperSlide>
              );
          })}
        </Swiper>
      </div>
      <div className="mx-[8%]  border-b-[1px]   border-gray-300 "></div>
    </>
  );
};

export default Attractions;
