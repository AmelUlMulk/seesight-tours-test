import React, { useState } from 'react';
import { CITIES_PAGE } from '../../api/citiesPage';
import Cities from '../../pages/cities';

interface Cards {
  text: string;
  name: string;
  showSnippet: boolean;
  setShowSnippet: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardSnippet = ({ text, name, showSnippet, setShowSnippet }: Cards) => {
  return (
    <>
      {showSnippet ? (
        <div
          onClick={e => {
            if (showSnippet) {
              e.stopPropagation();
              setShowSnippet && setShowSnippet(false);
            }
          }}
          className="absolute  z-10 w-full py-8 md:text-lg text-center  bottom-0 left-0   bg-[#000000] opacity-70 text-[#FFFFFF] text-[16px] font-[500]  "
        >
          {text}
        </div>
      ) : (
        <div
          onClick={e => {
            if (!showSnippet) {
              e.stopPropagation();
              setShowSnippet && setShowSnippet(true);
            }
          }}
          className="absolute bottom-0 z-10  bg-[#000000] opacity-70 text-[#FFFFFF] text-[18px] font-[500] px-4 py-2 rounded-sm "
        >
          {name}
        </div>
      )}
    </>
  );
};

export default CardSnippet;
