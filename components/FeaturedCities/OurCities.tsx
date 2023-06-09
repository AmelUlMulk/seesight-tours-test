import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/mediaQuery';
import { TextShadow } from '../Landingpage/components/testimonials';
import CitiesSwiper from './CitiesSwiper';
import CitiesDesk from './CitiesDesk';

interface IProps {
  title: string;
  subTitle: string;
  FeaturedCities?: any;
  citiesTotalCount: number;
  slug?: string;
}

const OurCities = ({
  title,
  subTitle,
  FeaturedCities,
  citiesTotalCount
}: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <section className="Our_Cities-wrapper mt-10 bg-[#F5F5F5] mx-10 sm:mx-20 md:mx-20 lg:mx-32 2xl:mx-40 pb-12 border-b border-[#C5C5C5]">
      <div id="header">
        <h2 className="text-[#333333] text-[18px] sm:text-[26px] lg:text-[36px] font-[600]">
          {title}
        </h2>
        <p className="text-[#4F4F4F] text-[16px] sm:text-[22px] lg:text-[28px] font-[600]">
          {subTitle}
        </p>
      </div>
      {mediaQuery ? (
        <CitiesSwiper data={FeaturedCities} />
      ) : (
        <CitiesDesk FeaturedCities={FeaturedCities} />
      )}
    </section>
  );
};

export default OurCities;
