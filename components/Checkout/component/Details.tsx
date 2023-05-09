/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';
import UserForm from './UserForm';
import Image from 'next/image';

interface Details {
  next: () => void;
  tour: any;
  pax: any;
}
const Details = ({ next, tour, pax }: Details) => {
  return (
    <SectionWrapper title="Traveler Information">
      <div className=" flex-col flex  md:flex-row items-start flex-wrap md:gap-4 ">
        <Summary />
        <UserForm next={next} />
        <div className="mt-4">
          <h2 className="text-xl  font-semibold  "> Book with confidence </h2>

          <div className="flex gap-2 my-2 items-center ">
            <Image
              src="/tickmark.png"
              className=" mt-2 "
              width={15}
              height={7}
              alt="tick mark"
            />
            <span>Lowest price guarantee </span>
          </div>
          <div className="flex items-start gap-2 my-2 ">
            <Image
              src="/tickmark.png"
              className=" mt-2 "
              width={15}
              height={7}
              alt="tick mark"
            />
            <span>Fee Cancellation Up to 24hrs in advance </span>
          </div>
          <div className="flex items-start gap-2 my-2 ">
            <Image
              src="/tickmark.png"
              className=" mt-2 "
              width={15}
              height={7}
              alt="tick mark"
            />
            <span>
              Book Securely Pay securely-we use SSL encryption to keep your data
              safe{' '}
            </span>
          </div>
          <h2 className="  text-2xl ">Call to book</h2>
          <span>We're happy to assist you with your booking!</span>

          <a href="tel:1-888-961-6584" className=" mt-4 text-blue-500 block  ">
            Call Now 1-888-961-6584
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Details;
