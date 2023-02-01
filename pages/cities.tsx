import React, { useState } from 'react';
import client from '../apollo-client';
import PageHero from '../components/Contact/PageHero';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { CITIES_PAGE_INTERFACE, CITIES_PAGE } from '../api/citiesPage';
import Newsletter from '../layouts/Newsletter/Newsletter';
import Head from 'next/head';
import { TrustBar } from '../components/TrustBar/TrustBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import CardSnippet from '../components/CardSnippet/CardSnippet';
import { AllCities } from '../components/AllCities/AllCities';

export async function getStaticProps() {
  const { data } = await client.query<CITIES_PAGE_INTERFACE>(CITIES_PAGE);

  return {
    props: {
      citiesPage: data.citiesPage
    }
  };
}

const Heading = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
`;

const Description = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  width: 90%;
  @media (max-width: 850px) {
    display: none;
  }
`;

const CityCards = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
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
        <div className="3xl:px-24  2xl:px-20 xl:px-20 lg:px-16 md:px-16 sm:px-12  xsm:px-8 xxsm:px-8 ">
          <div id="header" className="  lg:px-18 2xl:px-24">
            <Heading className="font-bold 2xl:text-4xl  xl:text-3xl md:text-2xl sm:text-2xl  xsm:text-2xl pt-10 ">
              FEATURED CITIES
            </Heading>
            {/* <Description className="2xl:text-[24px] xl:text-[24px] md:text-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              labore, necessitatibus sit dicta molestiae corrupti ipsum officiis
              qui.
            </Description> */}
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
                    <CityCards className="  max-w-xs w-full rounded-lg overflow-x-auto shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
                      <Link href={`/${cities.city.slug}`}>
                        <StyledImage
                          src={cities.city.cardMedia[0].url}
                          alt={cities.city.cardMedia[0].url}
                          width={250}
                          height={300}
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
      <AllCities cities={citiesPage.cities} />
      <Newsletter />
    </div>
  );
};

export default Cities;
