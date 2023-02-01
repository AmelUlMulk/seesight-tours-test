import React, { useState } from 'react';
import { CITIES_PAGE } from '../../api/citiesPage';
import Cities from '../../pages/cities';

interface Cards {
  text: string;
  name: string;
}

const CardSnippet = ({ text, name }: Cards) => {
  const [showSnippet, setShowSnippet] = useState(false);
  return (
    <>
      {showSnippet ? (
        <div
          onClick={() => {
            if (showSnippet) {
              setShowSnippet(false);
            }
          }}
          onMouseLeave={() => setShowSnippet(!showSnippet)}
          className="absolute bottom-[8px] left-[12px] right-10 bg-[#000000] opacity-70 text-[#FFFFFF] text-[16px] font-[500] xsm:px-3 px-10 py-5 rounded-lg"
        >
          {text}
        </div>
      ) : (
        <div
          onClick={() => {
            if (!showSnippet) {
              setShowSnippet(true);
            }
          }}
          onMouseEnter={() => setShowSnippet(!showSnippet)}
          className="absolute bottom-[8px] left-[12px] bg-[#000000] opacity-70 text-[#FFFFFF] text-[18px] font-[500] px-4 py-2 rounded-lg"
        >
          {name}
        </div>
      )}
    </>
  );
};

export default CardSnippet;
