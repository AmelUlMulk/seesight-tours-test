import React from 'react';
import styled from 'styled-components';
import { CityInterface } from '../../api/citiesPage';
import CityCard from './CityCard';

interface AllCities {
  cities: CityInterface[];
}

const Heading = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
`;

const citiesAmerica = [
  'austin-tours',
  'niagara-falls,-usa-tours',
  'philadelphia-,tours',
  'providence-to,urs',
  'Fort-Lauderda,le-Tours',
  'newport-tours,',
  'seattle-tours,',
  'keywest-tours,',
  'montreal-tour,s',
  'miami-tours',
  'boston-tours',
  'chicago-tours,',
  'savannah-tour,s'
];

const citiesCanada = [
  'saint-john-to,urs',
  'victoria-tours',
  'prince-edward,-island-tours',
  'niagara-falls,-tours-canada',
  'ottawa-tours',
  'vancouver-tou,rs',
  'st-johns-tour,s',
  'sydney-tours',
  'san-antonio-t,ours',
  'toronto-tours,',
  'halifax-tours,'
];

export const AllCities = ({ cities }: AllCities) => {
  return (
    <>
      <section className="mb-3  3xl:px-32  2xl:px-20 xl:px-20 lg:px-16 md:px-16 sm:px-12  xsm:px-8 xxsm:px-8 ">
        <div id="header" className=" lg:px-18 2xl:px-24">
          <Heading className="font-bold 2xl:text-4xl  xl:text-3xl md:text-2xl sm:text-2xl  xsm:text-2xl pt-10 ">
            ALL CITIES
          </Heading>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap gap-4 py-3 4xl:px-56 3xl:px-56 lg:px-32 2xl:px-24 sm:px-10  items-stretch justify-center ">
          {cities.map((city, index) => (
            <CityCard city={city.city} key={city.city.name} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};
