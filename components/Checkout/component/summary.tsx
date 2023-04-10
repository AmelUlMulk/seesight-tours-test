import React from 'react';
import { PASSENGERPAX } from '../../../pages/checkout/[slug]';

interface Iprops {
  passengerPax: PASSENGERPAX;
  totalPrice: number;
}
const Summary = ({
  passengerPax: { adults, children, infants },
  totalPrice
}: Iprops) => {
  const childrenPax = children ? children.count : 0;
  const infantPax = infants ? infants.count : 0;
  return (
    <div className="flex flex-col  text-white bg-blue-600   py-5 justify-center items-center min-height-[220] min-width-[500px]">
      <div className="flex px-2 w-4/5  xl:w-1/2 justify-between border-b-white border-b-2 ">
        <div className="border-r-white border-r-2 w-1/2 py-2">
          <h2>Adults</h2>
        </div>
        <div className="flex justify-between w-1/2 px-2 items-center  ">
          <h2>x {`${adults.count}`}</h2>
          <h2>{`${(adults.count * Number(adults.price)).toFixed(2)}`}</h2>
        </div>
      </div>
      {children && (
        <div className="flex px-2 w-4/5  xl:w-1/2 justify-between border-b-white border-b-2 ">
          <div className="border-r-white border-r-2 w-1/2 py-2">
            <h2>Children</h2>
          </div>
          <div className="flex justify-between w-1/2 px-2 items-center">
            <h2>x {`${children.count}`}</h2>
            <h2>{`${(children.count * Number(children.price)).toFixed(2)}`}</h2>
          </div>
        </div>
      )}
      {infants && (
        <div className="flex px-2 w-4/5  xl:w-1/2 justify-between border-b-white border-b-2 ">
          <div className="border-r-white border-r-2 w-1/2 py-2">
            <h2>Infants</h2>
          </div>
          <div className="flex justify-between w-1/2 px-2 items-center">
            <h2>x {`${infants.count}`}</h2>
            <h2>{`${(infants.count * Number(infants.price)).toFixed(2)}`}</h2>
          </div>
        </div>
      )}
      <div className=" flex px-2  w-4/5  xl:w-1/2 justify-between border-b-white border-b-2 ">
        <div className="border-r-white border-r-2 w-1/2 py-2">
          <h2>Total</h2>
        </div>
        <div className="flex items-center justify-between w-1/2 px-2 ">
          <h2>
            {' '}
            x {} {childrenPax + infantPax + adults.count}
          </h2>
          <h2>$ {totalPrice.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default Summary;
