import { gql } from '@apollo/client';
import { get } from 'https';
import React from 'react';
import styled from 'styled-components';
import { CITIES_FILTER, CITY_FILTER_INTERFACE } from '../../api/cityfilter';
import {
  CITYDATEINTERFACE,
  CITY_PAGE_INTERFACE,
  FETCH_CITY
} from '../../api/cityPage';
import FEATUREDEXPERIENCES, {
  FEATURED_EXPERIENCES_INTERFACE
} from '../../api/featuredexperiences';
import client from '../../apollo-client';
import Attractions from '../../components/CityPage/attractions';
import FeaturedExperiences from '../../components/FeaturedExperiences/FeaturedExperiences';
import SearchCity from '../../components/Searchbar/searchCity';
import ProductTimeline from '../../components/TourPage/ProductTimeline';
import Trustbar from '../../components/Trust/Trustbar';
import Newsletter from '../../layouts/Newsletter/Newsletter';
import PageHero from '../../layouts/PageHero';
import Head from 'next/head';
import CitiesModal from '../../components/CitiesModal.tsx';

const StyledDiv = styled.div`
  margin-top: 2rem;
  font-size: 18px;
  b {
    ::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 29px;
      height: 26px;
      background-image: url('/hand.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  h1 {
    position: relative;
    padding-left: 50px;
    font-size: 24px;
  }
  h2 {
    position: relative;
    padding-left: 50px;
    font-size: 24px;
  }
  h3 {
    position: relative;
    padding-left: 50px;
    font-size: 24px;
  }
`;

interface IPROPS {
  featuredExp: FEATURED_EXPERIENCES_INTERFACE;
  cities: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  city: CITYDATEINTERFACE;
}

const City = ({ featuredExp, cities, city }: IPROPS) => {
  return (
    <>
      <Head>
        <title>{city?.pageTitle}</title>
        <meta
          property="og:description"
          content={city?.metaDescription}
          key="metadescription"
        />
        <link href={city?.canonical} rel="canonical" key="canonical" />
      </Head>
      <section id="hero" className="relative">
        <PageHero
          title={city.header ? city.header : ''}
          snippet={'Size Matters'}
          media={city.heroMedia[0].url}
          video={city.heroMedia[0].url.includes('mp4')}
          landing
        />
        <CitiesModal />
      </section>
      <Trustbar />
      <h2 className=" px-[8%] text-3xl font-bold capitalize mt-6 ">
        TOURS IN NIAGARA FALLS,CANADA
      </h2>

      <FeaturedExperiences featuredExp={featuredExp} citydropdown={cities} />

      {city.attractions.length > 1 && (
        <Attractions name={city.name} attractions={city.attractions} />
      )}
      <p className="w-full px-[20%] leading-9 text-lg   mt-8  font-normal  ">
        {city.shortDescription}
      </p>
      <StyledDiv
        dangerouslySetInnerHTML={{
          __html: city?.longDescription
        }}
        className="px-[10%]"
      />
      <Newsletter />
    </>
  );
};

interface SLUG {
  params: {
    slug: string;
  };
}

export async function getStaticPaths() {
  const getAllCities = await client.query({
    query: gql`
      query {
        cities {
          id
          name
          slug
        }
      }
    `
  });
  const invalid = [
    'newport-tours',
    'providence-tours',
    'victoria-tours',
    '',
    null
  ];
  const validTours = getAllCities.data.cities.filter((item: any) => {
    if (!invalid.includes(item.slug)) {
      return item;
    }
  });
  return {
    paths: validTours.map((city: any) => {
      return {
        params: { slug: city.slug.toString(), cities: getAllCities.data.cities }
      };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }: SLUG) {
  const { data: city } = await client.query<CITY_PAGE_INTERFACE>({
    query: FETCH_CITY,
    variables: {
      slug: slug
    }
  });

  const { data: featuredData, error } =
    await client.query<CITY_FILTER_INTERFACE>({
      query: CITIES_FILTER,
      variables: {
        filter: {
          slug: slug
        }
      }
    });
  console.log('the error', error);
  return {
    props: {
      featuredExp: featuredData.cities[0] ? featuredData.cities[0] : {},
      cities: featuredData.citiesList,
      city: city.cities[0]
    }
  };
}
export default City;
