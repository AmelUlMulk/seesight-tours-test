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
    <div className=" px-[3%] xl:px-[10%] py-12">
      <h1 className="font-bold text-3xl xl:text-5xl      ">CITIES IN CANADA</h1>
      <div className="flex flex-wrap gap-2 xl:gap-6 w-full  justify-center xl:justify-start  py-12 ">
        {cities.slice(0, 9).map((city, index) => {
          return (
            <CityCard city={city.city} key={city.city.name} index={index} />
          );
        })}
      </div>
      <h1 className="font-bold text-3xl xl:text-5xl      ">
        CITIES IN AMERICA
      </h1>
      <div className="flex flex-wrap gap-6 w-full  justify-center xl:justify-start  py-12 ">
        {cities.slice(9, 21).map((city, index) => {
          return (
            <CityCard city={city.city} key={city.city.name} index={index} />
          );
        })}
      </div>
    </div>
  );
};
