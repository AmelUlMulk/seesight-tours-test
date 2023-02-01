import React from 'react';
import CardSnippet from '../CardSnippet/CardSnippet';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import City from './../../pages/[slug]';

interface City {
  cities: any;
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

export const AllCities = ({ cities }: City) => {
  return (
    <>
      <section className="mt-10 mb-10 bg-[#F5F5F5] 3xl:px-24  2xl:px-20 xl:px-20 lg:px-16 md:px-16 sm:px-12  xsm:px-8 xxsm:px-8 ">
        <div id="header" className=" pt-10 lg:px-18 2xl:px-24">
          <Heading className="font-bold 2xl:text-4xl  xl:text-3xl md:text-2xl sm:text-2xl  xsm:text-2xl pt-10 ">
            ALL CITIES
          </Heading>
        </div>

        <div className="flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center ">
          {cities
            .slice(0, 3)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className="flex-none w-[25rem] relative max-h-[340px] 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className="relative max-h-[340px]  flex-none  3xl:w-[40rem] 2xl:w-[25rem]  xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className="flex-none w-[25rem] relative max-h-[340px] 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center">
          {cities
            .slice(3, 6)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className="relative max-h-[340px]  flex-none  3xl:w-[40rem] 2xl:w-[25rem]  xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className="flex-none w-[25rem] relative max-h-[340px] 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className="flex-none w-[25rem] relative max-h-[340px] 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center">
          {cities
            .slice(6, 9)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className="flex-none  relative max-h-[340px] 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" relative max-h-[340px]  flex-none  3xl:w-[40rem] 2xl:w-[25rem] xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem]  sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className=" flex flex-wrap gap-5 py-3  lg:px-32 2xl:px-24 justify-center  ">
          {cities
            .slice(9, 12)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className="flex-none  relative max-h-[340px] xl:w-[20rem] 3xl:w-[25rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link
                          className="w-[100%] h-[100%]"
                          href={cities?.city?.slug}
                        >
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" relative max-h-[340px] flex-none 3xl:w-[40rem] 2xl:w-[25rem] xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem] xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center">
          {cities
            .slice(12, 15)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[40rem] 2xl:w-[25rem] xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className=" flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center">
          {cities
            .slice(15, 18)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className=" relative max-h-[340px]  flex-none  3xl:w-[40rem] 2xl:w-[25rem] xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" relative max-h-[340px] flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className=" relative max-h-[340px] flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center ">
          {cities
            .slice(18, 21)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" relative max-h-[340px]  flex-none  3xl:w-[40rem] 2xl:w-[25rem] xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] xxsm:w-[25rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem] ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="flex flex-wrap gap-5 py-3 lg:px-32 2xl:px-24 justify-center ">
          {cities
            .slice(21, 24)
            .map((cities: Record<string, any>, index: number) => {
              return (
                <>
                  {index == 0 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[25rem]  xl:w-[20rem]  lg:w-[20rem] md:w-[16rem] sm:w-[25rem]  xsm:w-[20rem]">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" relative max-h-[340px]  flex-none 3xl:w-[40rem] 2xl:w-[25rem] xl:w-[20rem] lg:w-[20rem] md:w-[16rem] sm:w-[25rem] xsm:w-[20rem]  ">
                      <div
                        id="image_wrapper"
                        className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                      >
                        <Link href={cities?.city?.slug}>
                          <Image
                            src={cities?.city?.cardMedia[0]?.url}
                            width={360}
                            height={340}
                            alt={cities?.city?.cardMedia[0]?.alt}
                            className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                          />
                        </Link>
                        <CardSnippet
                          text={cities.city.cardSnippet}
                          name={cities.city.name}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};
