import React, { useState } from 'react';
import client from '../apollo-client';
import PageHero from '../layouts/PageHero';
import { CITIES_PAGE_INTERFACE, CITIES_PAGE } from '../api/citiesPage';
import Newsletter from '../layouts/Newsletter/Newsletter';
import Head from 'next/head';
import { TrustBar } from '../components/TrustBar/TrustBar';
import { AllCities } from '../components/AllCities/AllCities';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import styled from 'styled-components';
import Image from 'next/image';

import Card from '../components/Card';

const Heading = styled.h1`
  font-style: normal;
  font-weight: bolder;
`;

const CityCards = styled.div`
  margin-top: 1.5rem;
  min-width: 32%;
  max-height: 400px;
  img {
    height: 100%;
  }
  @media (max-width: 1500px) {
    margin-top: 1.5rem;
  }
  button {
    position: absolute;
  }
`;

const StyledImage = styled(Image)`
  z-index: 0;
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
`;
const StyledSection = styled.section`
  h1: {
    font-weight: 700;
    font-family: poppins;
  }
`;
export async function getStaticProps() {
  const { data } = await client.query<CITIES_PAGE_INTERFACE>(CITIES_PAGE);

  return {
    props: {
      citiesPage: data.citiesPage
    }
  };
}

const Cities = ({ citiesPage }: CITIES_PAGE_INTERFACE) => {
  return (
    <div>
      <Head>
        <title>{citiesPage.pageTitle}</title>
        <meta
          property="og:description"
          content={citiesPage.metaDescription}
          key="metadescription"
        />
        <link href={citiesPage.canonical} rel="canonical" key="canonical" />
      </Head>
      <PageHero
        title={'OUR CITIES'}
        snippet={'Let us show you the places we call home'}
        media={
          'https://res.cloudinary.com/see-sight-tours/video/upload/f_auto,q_auto,t_header/v1632763195/strapi/CitiesPage-Desktop.mp4'
        }
        video={true}
      />
      <TrustBar />
      <section className="flex flex-col w-full  justify-start ">
        <div className=" pl-[3%] xl:pl-[10%] ">
          <h1 className="font-bold text-3xl md:text-5xl pt-12    ">
            FEATURED CITIES
          </h1>

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
              400: {
                slidesPerView: 1.3
              },
              800: {
                slidesPerView: 2.3
              },
              1200: {
                slidesPerView: 2.8
              }
            }}
          >
            {citiesPage.featured &&
              citiesPage.featured.map(cities => (
                <SwiperSlide key={cities.city.id}>
                  <Card
                    slug={cities.city.slug}
                    image={cities.city.cardMedia[0].url}
                    cardSnippet={cities.city.cardSnippet}
                    city={cities.city.name}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <AllCities cities={citiesPage.cities} />
        <Newsletter />
      </section>
    </div>
  );
};

export default Cities;
