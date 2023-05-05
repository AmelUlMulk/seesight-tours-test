/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import { PASSENGERPAX } from '../../../pages/checkout';
import Image from 'next/image';
import styled from 'styled-components';
import { PaxContext } from '../../../utils/checkoutContext';
import dayjs from 'dayjs';

export const Span = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Summary = () => {
  //@ts-ignore
  const { pax, tour } = useContext(PaxContext);
  const children = 1;
  const infants = 1;
  // const childrenPax = children ? children?.count : 0;
  // const infantPax = infants ? infants?.count : 0;
  console.log('these are the things', tour);
  const {} = tour;
  return (
    <div className=" w-[98%] mb-8 md:w-[46%] flex flex-col">
      <div
        className=" w-full
     flex flex-col  text-black   bg-white   shadow-md md:shadow-2xl  p-5 justify-start items-center min-height-[220]"
      >
        <div className="flex gap-2 md:gap-4 items-center justify-start w-full">
          {tour.tourImage.includes('mp4') ? (
            <video
              src={tour.tourImage}
              autoPlay
              className="max-w-[220px] min-h-[200px] md:w-250 "
            />
          ) : (
            <Image
              src={tour.tourImage}
              width={250}
              height={250}
              alt="booking-image"
              className=" shadow-md max-w-[60%] min-h-[200px]  "
            />
          )}

          <div className="flex flex-col gap-4  text-base uppercase   ">
            <Span>{tour.tour}</Span>
            <span>
              {dayjs(pax.selectedTimeSlot?.startTime).format(
                'ddd, DD MMM YYYY'
              )}
            </span>
            <span>
              {dayjs(pax.selectedTimeSlot?.startTime).format('hh:mm a')}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {pax.adults && (
            <div className="flex     justify-between border-b-white border-b-2 ">
              <div className="border-r-white border-r-2 w-1/2 py-2">
                <h2>{pax.adults.label} (13+)</h2>
              </div>
              <h2 className="w-1/4 text-start">
                $ {Number(pax.adults.count * pax.adults.price).toFixed(2)}
              </h2>
              {/* <h2>x {`${children.count}`}</h2>
            <h2>{`${(children.count * Number(children.price)).toFixed(2)}`}</h2> */}
            </div>
          )}
          {pax.children && (
            <div className="flex     justify-between border-b-white border-b-2 ">
              <div className="border-r-white border-r-2 w-1/2 py-2">
                <h2>{pax.children.label} (5-12)</h2>
              </div>
              <h2 className="w-1/4 text-start">
                $ {Number(pax.children.count * pax.children.price).toFixed(2)}
              </h2>

              {/* <h2>x {`${children.count}`}</h2>
            <h2>{`${(children.count * Number(children.price)).toFixed(2)}`}</h2> */}
            </div>
          )}
          {pax.infants && (
            <div className="flex     justify-between border-b-white border-b-2 ">
              <div className="border-r-white border-r-2 w-1/2 py-2">
                <h2>{pax.infants.label} (Under 5)</h2>
              </div>
              <h2 className="w-1/4 text-start">
                $ {Number(pax.infants.count * pax.infants.price).toFixed(2)}
              </h2>

              {/*  <h2>x {`${infants.count}`}</h2>
            <h2>{`${(infants.count * Number(infants.price)).toFixed(2)}`}</h2> */}
            </div>
          )}
          <div className=" flex     border-t-2 border-gray-300      justify-between border-b-white border-b-2 ">
            <div className="border-r-white border-r-2 w-1/2 py-2">
              <h2>Total</h2>
            </div>
            <div className=" w-1/4 flex items-center   pr-2 ">
              <h2 className=" font-semibold text-start text-[#F15C5A] ">
                $ {pax.totalPrice.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
