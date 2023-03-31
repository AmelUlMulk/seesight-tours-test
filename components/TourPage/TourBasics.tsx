import Image from 'next/image';
import React from 'react';
import scrollToElement from '../../utils/scrollIntoView';

interface TOUR {
  price: number;
  duration: number;
  type: string;
  rating: number;
  totalRatings: number;
}

const TourBasics = ({ price, duration, type, rating, totalRatings }: TOUR) => {
  return (
    <>
      <div className=" px-[2%] 2xl:px-[10%] flex justify-between py-4 ">
        <div className=" md:w-[50%]  flex  justify-evenly gap-2 md:gap-8  ">
          <div className="flex flex-col">
            <span className=" text-sm md:text-xl text-black font-normal ">
              Prices
            </span>
            <span className=" text-sm md:text-xl text-[#505050] font-normal">
              From ${price}{' '}
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" text-sm md:text-xl text-black font-normal ">
              Duration
            </span>
            <span className=" text-sm md:text-xl text-[#505050] font-normal">
              {' '}
              {duration} Hours{' '}
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" text-sm md:text-xl text-black font-normal ">
              Tour Type
            </span>
            <span className=" text-sm md:text-xl text-[#505050] font-normal">
              {type}{' '}
            </span>
          </div>
        </div>
        <div className=" md:w-[30%] flex justify-start gap-8  ">
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
        </div>
      </div>
      <div className=" text-sm  px-[2%] 2xl:px-[10%] flex justify-between py-4 md:py-8 ">
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
          <button className="py-2 px-4 md:px-6 bg-[#F15C5A] text-white rounded-md    ">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default TourBasics;
