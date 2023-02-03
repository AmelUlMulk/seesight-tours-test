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
    <section className="Our_Cities-wrapper mt-10 bg-[#F5F5F5] xsm:px-12 md:px-28 lg:px-32 2xl:px-40">
      <div id="header" className=" pt-10 ">
        <TextShadow className="text-[#333333] text-[60px] font-[600]">
          {title}
        </TextShadow>
        <p className="text-[#4F4F4F] text-[32px] font-[600]">{subTitle}</p>
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
