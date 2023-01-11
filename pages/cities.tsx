import React from 'react';
import client from '../apollo-client';
import PageHero from '../components/Contact/PageHero';
import styled from 'styled-components';
import Image from 'next/image';
import { CITIES_PAGE_INTERFACE, CITIES_PAGE } from '../api/citiesPage';
import Link from 'next/link';

export async function getStaticProps() {
  const { data } = await client.query<CITIES_PAGE_INTERFACE>(CITIES_PAGE);
  return {
    props: {
      citiesPage: data.citiesPage
    }
  };
}

const CityCards = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
  max-height: 600px;
`;

const StyledImage = styled(Image)`
  z-index: 0;
  height: 200px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
`;

const Cities = ({ citiesPage }: CITIES_PAGE_INTERFACE) => {
  return (
    <div>
      <PageHero
        title={'Our Cities'}
        snippet={'Let us show you the places we call home'}
        media={
          'https://res.cloudinary.com/see-sight-tours/video/upload/f_auto,q_auto,t_header/v1632763195/strapi/CitiesPage-Desktop.mp4'
        }
        video={true}
      />
      <h1 className="font-bold text-4xl text-center pt-10">Featured Cities</h1>
      <div className="flex justify-center">
        <div className="grid w-5/6 grid-cols-4 gap-3 xxsm:grid-cols-1 xsm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {citiesPage.featured.map(cities => (
            <div className="flex justify-center w-full" key={cities.city.id}>
              <CityCards className="  max-w-xs w-full rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
                <Link href={`/${cities.city.slug}`}>
                  <StyledImage
                    src={cities.city.cardMedia[0].url}
                    alt={cities.city.cardMedia[0].url}
                    width={500}
                    height={200}
                  />
                  <div className="px-2 py-4 relative">
                    <div className="font-bold text-xl mb-2 px-5 text-center">
                      {cities.city.name}
                    </div>
                    <div className="px-5 text-base text-center">
                      {cities.city.cardSnippet}
                    </div>
                  </div>
                </Link>
              </CityCards>
            </div>
          ))}
        </div>
      </div>

      <h1 className="font-bold text-4xl text-center pt-10">All Cities</h1>
      <div className="flex justify-center">
        <div className="grid w-5/6 grid-cols-4 gap-3 xxsm:grid-cols-1 xsm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {citiesPage.cities.map(cities => (
            <div className="flex justify-center w-full" key={cities.city.id}>
              <CityCards className="  max-w-xs w-full rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
                <StyledImage
                  src={cities.city.cardMedia[0].url}
                  alt={cities.city.cardMedia[0].url}
                  width={500}
                  height={200}
                />
                <div className="px-2 py-4 relative">
                  <div className="font-bold text-xl mb-2 px-5 text-center">
                    {cities.city.name}
                  </div>
                </div>
              </CityCards>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
