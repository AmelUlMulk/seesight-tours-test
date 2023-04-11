import React from 'react';
import Head from 'next/head';
import {
  BOOKING_SEARCH,
  BOOKING_INTERFACE,
  MY_TOURS_PAGE_INTERFACE
} from '../../api/myTour';
import Image from 'next/image';
import client from '../../apollo-client';
import dayjs from 'dayjs';
import styled from 'styled-components';

interface IProps {
  booking: BOOKING_INTERFACE;
  notFound: boolean;
  image: string;
}
const StyledDiv = styled.div`
  min-height: 63vh;
  width: 100%;
  background: url('https://res.cloudinary.com/see-sight-tours/image/upload/v1645127888/Niagara-Falls-Iconic-Boat-Falls.webP');
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 100% 100%;
`;
const MyToursByID = ({
  booking: {
    product,
    passengers,
    REZDY,
    pickupLocation,
    customer,
    status,
    id,
    tourDate,
    tourTime,
    guide,
    transactions
  },
  notFound,
  image
}: IProps) => {
  console.log('the transactions', transactions);
  return (
    <>
      <Head>
        <title>My Tours</title>
      </Head>
      {notFound ? (
        <h2>No Booking Found with the given id</h2>
      ) : (
        <>
          <h1 className="text-3xl text-black text-center mb-8 font-semibold my-4  ">
            {product.name}
          </h1>
          <StyledDiv />
          {/* <Image
            src={image}
            width={1000}
            height={600}
            quality={100}
            alt="mian"
            className=" min-w-full max-h-[60vh] "
          /> */}
          <div className=" px-[2%] md:px-[15%]  py-8 bg-gray-200 w-full ">
            <div className=" pb-2  border-b-gray-300  border-b-2  ">
              <h1 className="text-xl mb-2">Booking Reference</h1>
              <div className="flex justify-between ">
                <span className="md:w-4/6">Booking Reference Code</span>
                <span className=" md:w-1/3  text-start">{id}</span>
              </div>
            </div>
            <div className=" pt-4 pb-2  border-b-gray-300  border-b-2  ">
              <h1 className="text-xl mb-2">Departure</h1>
              <div className="flex justify-between ">
                <span className="md:w-4/6">Time & Date</span>
                <span className=" md:w-1/3  text-start">
                  {tourTime} {dayjs(tourDate).format('MMMM DD, YYYY')}
                </span>
              </div>
            </div>
            {guide !== null && (
              <div className=" pt-4 pb-2  border-b-gray-300  border-b-2  ">
                <h1 className="text-xl mb-2">Your Guide</h1>
                <div className="flex justify-between ">
                  <span className="md:w-4/6">Name</span>
                  <span className=" md:w-1/3  text-start">
                    {guide.full_name}
                  </span>
                </div>
              </div>
            )}
            <div className=" pt-4 pb-2  border-b-gray-300  border-b-2  ">
              <h1 className="text-xl mb-2">Pick Up Location</h1>
              <div className="flex justify-between ">
                <span className="md:w-4/6">location</span>
                <span className=" md:w-1/3  text-start">{pickupLocation}</span>
              </div>
            </div>
            <div className=" pt-4 pb-2  border-b-gray-300  border-b-2  ">
              <h1 className="text-xl mb-2">Booking Info</h1>
              <div className="flex justify-between ">
                <span className="md:w-4/6">Tickets</span>
                <div className="flex flex-col md:w-1/3 justify-start">
                  {passengers.map(passenger => {
                    console.log('this is the passenger', passenger.price);
                    if (passenger.quantity > 0)
                      return (
                        <div className="flex w-full justify-between">
                          <span className=" text-start">
                            {' '}
                            {passenger.unit.label} ({passenger.quantity})
                          </span>
                          {passenger.price && (
                            <span className="text-end text-black">
                              ${passenger.price}
                            </span>
                          )}
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
            {transactions[0] && (
              <div className=" pt-4 pb-2  border-b-gray-300  border-b-2  ">
                <h1 className="text-xl mb-2">Payment</h1>
                <div className="flex justify-between ">
                  <span className="md:w-4/6">{transactions[0]?.card_type}</span>
                  <div className=" md:w-1/3 flex justify-between  text-start">
                    <span>
                      {' '}
                      {dayjs(transactions[0].date).format(
                        'MMM DD,YYYY HH:MM a'
                      )}{' '}
                    </span>
                    <span className="  text-end">
                      {transactions[0].card_type} Total:{' '}
                      <span className=" font-extrabold">
                        ${transactions[0].value}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-8  items-center ">
              <span>Free Cancelation before 24th in advance</span>
              <a
                href="tel:+1-888-961-6584"
                className="bg-[#F15C5A] text-white px-2 py-2 md:px-6 md:py-4 rounded-xl md:mr-[10%]  "
              >
                Call Office
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyToursByID;
interface Params {
  params: {
    slug: string;
  };
}

export async function getServerSideProps({ params: { slug } }: Params) {
  const data = await client.query<MY_TOURS_PAGE_INTERFACE>({
    query: BOOKING_SEARCH,
    variables: {
      slug
    }
  });
  console.log('billy', data.data.booking[0]);
  if (data.data.booking[0]) {
    return {
      props: {
        booking: data.data.booking[0],
        notFound: false,
        //@ts-ignore
        image:
          'https://res.cloudinary.com/see-sight-tours/image/upload/v1645127888/Niagara-Falls-Iconic-Boat-Falls.webP'
      }
    };
  }
  return {
    props: {
      notFound: true,
      booking: [0]
    }
  };
}
