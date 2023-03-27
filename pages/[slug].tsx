import { gql } from '@apollo/client';
import { get } from 'https';
import React from 'react';
import styled from 'styled-components';
import { CITIES_FILTER, CITY_FILTER_INTERFACE } from '../api/cityfilter';
import {
  CITYDATEINTERFACE,
  CITY_PAGE_INTERFACE,
  FETCH_CITY
} from '../api/cityPage';
import FEATUREDEXPERIENCES, {
  FEATURED_EXPERIENCES_INTERFACE
} from '../api/featuredexperiences';
import client from '../apollo-client';
import Attractions from '../components/CityPage/attractions';
import FeaturedExperiences from '../components/FeaturedExperiences/FeaturedExperiences';
import SearchCity from '../components/Searchbar/searchCity';
import ProductTimeline from '../components/TourPage/ProductTimeline';
import Trustbar from '../components/Trust/Trustbar';
import Newsletter from '../layouts/Newsletter/Newsletter';
import PageHero from '../layouts/PageHero';

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
  console.log('the city', city);
  return (
    <>
      <section id="hero" className="relative">
        <PageHero
          title={city.header}
          snippet={'Size Matters'}
          media="https://res.cloudinary.com/see-sight-tours/video/upload/v1658237954/landing-page-hero_mu19mc.mp4"
          video={true}
        />
        <SearchCity />
      </section>
      <Trustbar />
      <h1 className=" px-[8%] text-3xl font-bold capitalize mt-6 ">
        TOURS IN NIAGARA FALLS,CANADA
      </h1>

      <FeaturedExperiences featuredExp={featuredExp} citydropdown={cities} />

      <Attractions name={city.name} attractions={city.attractions} />
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
  return {
    paths: getAllCities.data.cities.map((city: any) => {
      return {
        params: { slug: city.slug.toString(), cities: getAllCities.data.cities }
      };
    }),
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }: SLUG) {
  const { data: featuredData } = await client.query<CITY_FILTER_INTERFACE>({
    query: CITIES_FILTER,
    variables: {
      filter: {
        slug: slug
      }
    }
  });
  const { data: city } = await client.query<CITY_PAGE_INTERFACE>({
    query: FETCH_CITY,
    variables: {
      slug: slug
    }
  });
  return {
    props: {
      featuredExp: featuredData.cities[0],
      cities: featuredData.citiesList,
      city: city.cities[0]
    }
  };
}
export default City;
