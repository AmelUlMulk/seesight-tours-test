import React from 'react';
import { PRODUCTINTERFACE } from '../../api/commonInterfaces';
import TourCard from '../Tour/tourCard';

interface RELATEDPRODUCT {
  products: [PRODUCTINTERFACE];
}

const RelatedTours = ({ products }: RELATEDPRODUCT) => {
  return (
    <div className=" px-[2%] 2xl:px-[10%] py-[2%]">
      <h2 className=" text-xl md:text-[28px] font-extrabold mt-6 w-full     ">
        Related Tours
      </h2>
      <div className="flex justify-evenly flex-wrap w-full  ">
        {products.map(product => (
          <div className="max-w-[360px]" key={product.name}>
            <TourCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTours;
