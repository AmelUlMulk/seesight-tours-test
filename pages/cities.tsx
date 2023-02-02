import React, { useState } from 'react';
import client from '../apollo-client';
import PageHero from '../components/Contact/PageHero';
import { CITIES_PAGE_INTERFACE, CITIES_PAGE } from '../api/citiesPage';
import Newsletter from '../layouts/Newsletter/Newsletter';
import Head from 'next/head';
import { TrustBar } from '../components/TrustBar/TrustBar';
import { AllCities } from '../components/AllCities/AllCities';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CardSnippet from '../components/CardSnippet/CardSnippet';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const Heading = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
`;

const CityCards = styled.div`
  margin-top: 1.5rem;

  max-height: 700px;
  @media (max-width: 1500px) {
    margin-top: 1.5rem;
  }
`;

const StyledImage = styled(Image)`
  z-index: 0;
  height: 250px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
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
        title={'Our Cities'}
        snippet={'Let us show you the places we call home'}
        media={
          'https://res.cloudinary.com/see-sight-tours/video/upload/f_auto,q_auto,t_header/v1632763195/strapi/CitiesPage-Desktop.mp4'
        }
        video={true}
      />
      <TrustBar />
      <section>
        <div className="3xl:px-32  2xl:px-20 xl:px-20 lg:px-16 md:px-16 sm:px-12  xsm:px-8 xxsm:px-8 ">
          <div id="header" className="  lg:px-18 2xl:px-24">
            <Heading className="font-bold 2xl:text-4xl  xl:text-3xl md:text-2xl sm:text-2xl  xsm:text-2xl pt-10 ">
              FEATURED CITIES
            </Heading>
          </div>
          <div className="lg:px-18 2xl:px-24">
            <Swiper
              className="swiper_123"
              spaceBetween={20}
              slidesPerView={4}
              pagination={{ clickable: true }}
              effect="slide"
              grabCursor
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetween: 2
                },
                450: {
                  slidesPerView: 2,
                  spaceBetween: 2
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 2
                },
                800: {
                  slidesPerView: 3,
                  spaceBetween: 2
                },
                900: {
                  slidesPerView: 4,
                  spaceBetween: 4
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 6
                },
                1600: {
                  slidesPerView: 5,
                  spaceBetween: 8
                },
                1800: {
                  slidesPerView: 5,
                  spaceBetween: 10
                }
              }}
              a11y={{ enabled: true }}
              observer
              observeParents
              observeSlideChildren
            >
              {citiesPage.featured &&
                citiesPage.featured.map(cities => (
                  <SwiperSlide key={cities.city.id}>
                    <CityCards className=" w-[100%] h-[100%] rounded relative !overflow-hidden overflow-x-auto shadow-lg cursor-pointer ">
                      <Link href={`/${cities.city.slug}`}>
                        <StyledImage
                          src={cities.city.cardMedia[0].url}
                          alt={cities.city.cardMedia[0].url}
                          width={250}
                          height={300}
                          className="w-[100%] h-[100%] rounded hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      <CardSnippet
                        text={cities.city.cardSnippet}
                        name={cities.city.name}
                      />
                    </CityCards>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
      ;
      <AllCities cities={citiesPage.cities} />
      <Newsletter />
    </div>
  );
};

export default Cities;
