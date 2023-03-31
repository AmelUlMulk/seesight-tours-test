import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import CardSnippet from '../CardSnippet/CardSnippet';
import CityCard from '../AllCities/CityCard';
interface IProps {
  FeaturedCities: [];
}
interface CardProps {
  large: boolean;
}

const CitiesDesk = ({ FeaturedCities }: IProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 xl:gap-6 w-full  justify-center xl:justify-start py-10">
        {FeaturedCities?.slice(0, 6).map(
          (city: Record<string, any>, index: number) => {
            return (
              <CityCard city={city?.city} index={index} key={city?.city.name} />
            );
          }
        )}
      </div>
    </>
  );
};

export default CitiesDesk;
