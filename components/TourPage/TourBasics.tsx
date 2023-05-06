import Image from 'next/image';
import React from 'react';
import scrollToElement from '../../utils/scrollIntoView';
import { Router, useRouter } from 'next/router';
interface TOUR {
  // price: number;
  duration: number;
  /* type: string;
  rating: number;
  totalRatings: number;
  slug: string; */
}

const TourBasics = ({
  // price,
  duration
}: /* type,
  rating,
  totalRatings,
  slug */
TOUR) => {
  const router = useRouter();
  console.log('the duration', duration);
  return (
    <>
      <div className=" w-full grid-cols-4    flex  gap-2 md:gap-8 md:items-end items-start    ">
        <div className="  flex justify-center md:justify-end w-full  items-center ">
          <Image src="/clockicon.png" width={16} height={16} alt="clock-icon" />
          <span className=" space-x-1 text-sm md:text-base text-[#505050] font-normal ">
            {' '}
            {duration} Hours
          </span>
        </div>
        <div className=" col-span-3 flex justify-start md:justify-end w-full  items-center ">
          <Image src="/persons.png" width={16} height={16} alt="persons" />
          <span className=" space-x-1 text-sm md:text-base text-[#505050] font-normal ">
            {' '}
            Up to 7 people
          </span>
        </div>
        <div className=" col-span-1 flex justify-start md:justify-end w-full  items-center ">
          <Image src="/transport.png" width={16} height={16} alt="clock-icon" />
          <span className=" space-x-1 text-sm md:text-base text-[#505050] font-normal ">
            {' '}
            Hotel Pick-up
          </span>
        </div>

        {/*    <div className=" md:w-[30%] flex justify-start gap-8  ">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 ">
              <Image
                src="/stars.png"
                width={20}
                height={20}
                alt="star"
                className=" max-h-6 "
              />
              <span className=" text-sm md:text-xl text-black">{rating}</span>
            </div>{' '}
            <span className=" text-sm md:text-xl text-[#505050]">
              ({totalRatings} Reviews)
            </span>
          </div>
        </div> */}
      </div>
      {/*   <div className=" text-sm  px-[2%] 2xl:px-[10%] flex justify-between py-4 md:py-8 ">
        <div className=" md:w-full xl:w-[50%]  flex  justify-evenly gap-2  md:gap-8 items-center  ">
          <div className="flex flex-col">
            <span
              className="text-black md:text-2xl font-semibold "
              onClick={() => scrollToElement('whatsincluded')}
            >
              What’s included
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-black md:text-2xl font-semibold "
              onClick={() => scrollToElement('what-you-will-see')}
            >
              What you’ll see
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-black md:text-2xl font-semibold "
              onClick={() => scrollToElement('to-do')}
            >
              What you’ll do
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-black md:text-2xl font-semibold "
              onClick={() => scrollToElement('reviews')}
            >
              Reviews
            </span>
          </div>
        </div>
        <div className=" md:relative items-center fixed bottom-0 right-2 z-20 w-full  md:bg-transparent  bg-[#2191FA] md:w-[30%] py-6 flex justify-evenly md:justify-end gap-8  ">
          <p className={`md:hidden text-white`}> Starting at ${price} </p>
          <button
            className="py-2 px-4 md:px-6 bg-[#F15C5A] text-white rounded-md    "
            onClick={() => router.push(`/checkout/${slug}`)}
          >
            Book Now
          </button>
        </div>
      </div> */}
    </>
  );
};

export default TourBasics;
