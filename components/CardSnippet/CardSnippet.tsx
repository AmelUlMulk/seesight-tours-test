import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CITIES_PAGE } from '../../api/citiesPage';
import Cities from '../../pages/cities';

interface Cards {
  text: string;
  name: string;
  slug: string;
  showSnippet: boolean;
  setShowSnippet: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardSnippet = ({
  text,
  name,
  slug,
  showSnippet,
  setShowSnippet
}: Cards) => {
  const router = useRouter();
  return (
    <>
      <div
        onMouseEnter={() => {
          if (!showSnippet) {
            setShowSnippet(true);
          }
        }}
        className={`absolute left-0 ${
          showSnippet && 'right-0'
        } bottom-0 bg-[#000000] opacity-70 ${
          !showSnippet && 'rounded-[5px]'
        } py-1 xl:py-2 px-2 lg:px-4 hover:cursor-pointer`}
        onClick={() => {
          if (!showSnippet) {
            setShowSnippet(!setShowSnippet);
          } else {
            router.push(`/${slug}`);
          }
        }}
      >
        <div
          className={` bottom-0 left-0 text-[#ffffff] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[24px] 2xl:text-[28px] font-[500] ${
            showSnippet && 'width-[100%]'
          }`}
        >
          {name}
        </div>

        {showSnippet && (
          <div
            className={` w-[100%] text-[#FFFFFF] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] font-[400] ${
              showSnippet && 'pb-2'
            } `}
          >
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default CardSnippet;
