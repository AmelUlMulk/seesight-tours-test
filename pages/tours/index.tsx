import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { CITIES } from '../../api/citiesPage';
import { CITIES_PAGE_INTERFACE } from '../../api/citiesPage';
import { CARDMEDIAINTERFACE } from '../../api/commonInterfaces';

import FEATUREDEXPERIENCES, {
  FEATURED_EXPERIENCES_INTERFACE,
  HOMEPAFE
} from '../../api/featuredexperiences';
import client from '../../apollo-client';
import Card from '../../components/Card';
import OurCities from '../../components/FeaturedCities/OurCities';
import FeaturedExperiences from '../../components/FeaturedExperiences/FeaturedExperiences';
import SearchCity from '../../components/Searchbar/searchCity';
import Trustbar from '../../components/Trust/Trustbar';
import PageHero from '../../layouts/PageHero';
import {
  DAYTOURS_PAGE,
  DAYTOURS_PAGE_INTERFACE,
  DAY_TOUR_INTERFACE
} from '../../api/dayToursPage';
import { useQuery } from '@apollo/client';
import Head from 'next/head';

const Tours = ({ featuredExp, citydropdown, cities, dayTour }: IProps) => {
  return (
    <>
      <Head>
        <title>{dayTour?.pageTitle}</title>
        <meta
          property="og:description"
          content={dayTour?.metaDescription}
          key="metadescription"
        />
        <link href={dayTour?.canonical} rel="canonical" key="canonical" />
      </Head>
      <section id="hero" className="relative">
        <PageHero
          title={'The Best Way to See The World'}
          snippet={
            'Best Small Group Tours. Operating Across Canada and the United States'
          }
          media="https://res.cloudinary.com/see-sight-tours/video/upload/v1658237954/landing-page-hero_mu19mc.mp4"
          video={true}
        />
        <SearchCity />
      </section>
      <Trustbar />
      <FeaturedExperiences
        featuredExp={featuredExp}
        citydropdown={citydropdown}
      />
      <div className=" ml-10 sm:ml-20 md:ml-20 lg:ml-32 2xl:ml-40  pt-3 pb-10 ">
        <h2 className="font-bold text-3xl md:text-5xl pt-12    ">Our CITIES</h2>

        <Swiper
          className="swiper_123 relative "
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
              slidesPerView: 1.2
            },
            400: {
              slidesPerView: 1.2
            },
            800: {
              slidesPerView: 3.2
            },
            1200: {
              slidesPerView: 4.3
            }
          }}
        >
          {cities &&
            cities.map(city => (
              <SwiperSlide key={city.city.id}>
                <Card
                  slug={city.city.slug}
                  image={city.city.cardMedia[0].url}
                  cardSnippet={city.city.cardSnippet}
                  city={city.city.name}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query<FEATURED_EXPERIENCES_INTERFACE>({
    query: FEATUREDEXPERIENCES,
    variables: {
      dayTours: true,
      multiday: true,
      airportTransfers: false
    }
  });
  const { data: citiesData } = await client.query<CITIES_PAGE_INTERFACE>(
    CITIES
  );

  const { data: { dayTour } = {} } =
    await client.query<DAYTOURS_PAGE_INTERFACE>({
      query: DAYTOURS_PAGE
    });
  return {
    props: {
      featuredExp: data.homePage,
      citydropdown: data.citiesDropdown,
      cities: citiesData.citiesPage.featured,
      dayTour
    }
  };
}
interface IProps {
  featuredExp: HOMEPAFE;
  citydropdown: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  cities: [
    {
      city: {
        id: string;
        name: string;
        slug: string;
        cardSnippet: string;
        cardMedia: [CARDMEDIAINTERFACE];
      };
    }
  ];
  dayTour: DAY_TOUR_INTERFACE;
}
export default Tours;
