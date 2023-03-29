import React from 'react';
import { PRODUCTINTERFACE } from '../../api/commonInterfaces';
import TourCard from '../Tour/tourCard';

interface RELATEDPRODUCT {
  products: [PRODUCTINTERFACE];
}

const RelatedTours = ({ products }: RELATEDPRODUCT) => {
  return (
    <div className="px-[10%] py-[2%]">
      <h2 className="text-5xl font-bold    ">Related Tours</h2>
      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xsm:grid-cols-1 grid-cols-2  gap-3 flex-wrap ">
        {products.map(product => (
          <TourCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedTours;
