import React from 'react';
import { PASSENGERPAX } from '../../../pages/checkout/[slug]';
import Image from 'next/image';
interface Iprops {
  /* passengerPax: PASSENGERPAX;
  totalPrice: number; */
}
const Summary = ({}: /* passengerPax: { adults, children, infants },
  totalPrice */
Iprops) => {
  const children = 1;
  const infants = 1;
  // const childrenPax = children ? children?.count : 0;
  // const infantPax = infants ? infants?.count : 0;
  return (
    <div
      className=" w-[46%]
     flex flex-col  text-black   bg-white    shadow-2xl  p-5 justify-start items-center min-height-[220]"
    >
      <div className="flex gap-6 items-center justify-start w-full">
        <Image
          src="https://res.cloudinary.com/see-sight-tours/image/upload/w_1000,t_desktop/f_auto,q_auto/fl_progressive:steep/v1581441842/Cannon-Demonstration-Citadel-Hill.jpg"
          width={250}
          height={250}
          alt="booking-image"
          className="  shadow-md "
        />
        <div className="flex flex-col gap-4  text-base uppercase   ">
          <span>Halifax</span>
          <span>Date</span>
          <span>Time</span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex     justify-between border-b-white border-b-2 ">
          <div className="border-r-white border-r-2 w-1/2 py-2">
            <h2>Adults</h2>
          </div>

          <h2>X Count</h2>

          {/*   <h2>x {`${adults.count}`}</h2>
          <h2>{`${(adults.count * Number(adults.price)).toFixed(2)}`}</h2> */}
        </div>
        {children && (
          <div className="flex     justify-between border-b-white border-b-2 ">
            <div className="border-r-white border-r-2 w-1/2 py-2">
              <h2>Children</h2>
            </div>
            <h2>X Count</h2>

            {/* <h2>x {`${children.count}`}</h2>
            <h2>{`${(children.count * Number(children.price)).toFixed(2)}`}</h2> */}
          </div>
        )}
        {infants && (
          <div className="flex     justify-between border-b-white border-b-2 ">
            <div className="border-r-white border-r-2 w-1/2 py-2">
              <h2>Infants</h2>
            </div>
            <h2>X Count</h2>

            {/*  <h2>x {`${infants.count}`}</h2>
            <h2>{`${(infants.count * Number(infants.price)).toFixed(2)}`}</h2> */}
          </div>
        )}
        <div className=" flex     border-t-2 border-gray-300      justify-between border-b-white border-b-2 ">
          <div className="border-r-white border-r-2 w-1/2 py-2">
            <h2>Total</h2>
          </div>
          <div className="flex items-center   px-2 ">
            <h2 className=" font-semibold text-[#F15C5A] ">
              $ 0{/* {totalPrice.toFixed(2)} */}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
