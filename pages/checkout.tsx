import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { gql, useLazyQuery } from '@apollo/client';
import client from '../apollo-client';
import { loadStripe } from '@stripe/stripe-js';
import dayjs from 'dayjs';
import { BOOKING_SEARCH, MY_TOURS_PAGE_INTERFACE } from '../api/my-tours';
import DateAndPax from '../components/Checkout/Date&Pax';
import useComponentSwipper from '../components/Checkout/useComponentSwiper';
import StripePayment from '../components/Checkout/StripePayment';
import ConfirmBooking from '../components/Checkout/ConfirmBooking';
import Steps from '../components/Checkout/component/steps';
import Thankyou from '../components/Checkout/Thanks';
import Head from 'next/head';
import Details from '../components/Checkout/component/Details';
import PaymentSection from '../components/Checkout/component/Payment';
import Router from 'next/router';
import { PaxContext } from '../utils/checkoutContext';
import { Elements } from '@stripe/react-stripe-js';

const ButtonDiv = styled.div`
  padding: 50px 20%;
  position: relative;
  z-index: 100;
  @media (max-width: 1200px) {
    padding: 50px 50px;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
    button: {
      width: 130px;
      height: 30px;
    }
  }
  display: flex;
  justify-content: end;
  gap: 2rem;
  .back {
    background: none;
    border: 2px solid #f15c5a;
  }
  button {
    width: 181px;
    height: 66px;
    color: white;
    left: calc(50% - 181px / 2 + 525.5px);
    top: 1098px;
    background: #f15c5a;
    border-radius: 10px;
  }
`;
interface StyleProps {
  image: string;
}

type PROPSDATA = {
  boatnew_products: [
    {
      id: string;
      name: string;
      rezdy: {
        rezdyId: string;
      };
      cities_products: [
        {
          city: {
            time_zone: string;
          };
        }
      ];
    }
  ];
  product_Availability: [AVAILABILITY];
  slug: string;
  products: [
    {
      carousel_media: [
        {
          url: string;
        }
      ];
    }
  ];
};
export type AVAILABILITY = {
  id: number;
  startTime: string;
  endTime: string;
  allDay: boolean;
  seats: number;
  seatsAvailable: 150;
  prices: PASSENGERINFO[];
};
export interface PASSENGERPAX {
  adults: PASSENGERINFO;
  children?: PASSENGERINFO;
  infants?: PASSENGERINFO;
  seats: number;
}

export type PASSENGERINFO = {
  count: number;
  label: string;
  title: string;
  price: string;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};
type CONTEXT = {
  params: {
    slug: string;
  };
};

const Checkout = () => {
  //@ts-ignore
  const { pax, tour } = useContext(PaxContext);

  const stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE));

  const [bookingId, setBookingId] = useState<string | undefined>('SAWUU6N');

  const [confirmationLoading, setConfirmationLoading] =
    useState<boolean>(false);

  const [thankyou, setThankYou] = useState<boolean>(false);

  const [getBookings, { data, loading, error }] =
    useLazyQuery<MY_TOURS_PAGE_INTERFACE>(BOOKING_SEARCH, {
      variables: {
        id: bookingId
      }
    });

  useEffect(() => {
    if (!pax?.adults) {
      Router.push('/');
    }
  }, []);
  useEffect(() => {
    if (bookingId) {
      getBookings({
        onCompleted: () => next()
      });
    }
  }, [bookingId]);

  const tiggerNext = () => {
    next();
  };
  const tiggerBack = () => {
    back();
  };

  const { component, currentComponentIndex, next, back } = useComponentSwipper([
    <Details key="details" next={tiggerNext} tour={tour} pax={pax} />,
    <PaymentSection
      next={tiggerNext}
      back={tiggerBack}
      key="payment"
      stripePromise={stripePromise}
      setBookingId={setBookingId}
    />,
    <ConfirmBooking
      key="confirmation"
      booking={data?.booking[0]}
      setThankYou={setThankYou}
      setConfirmationLoading={setConfirmationLoading}
      next={tiggerNext}
    />
  ]);

  return (
    <>
      <Head>
        <title>{`Checkout`}</title>
      </Head>
      <div className=" h-auto w-full bg-cover bg-no-repeat bg-center relative bg-white ">
        {thankyou && (
          <Thankyou open={thankyou} close={setThankYou} bookingId={bookingId} />
        )}
        <Steps currentStepIndex={currentComponentIndex} />
        {pax?.adults ? (
          component
        ) : (
          <div className="w-full flex justify-center text-3xl animate-pulse ">
            Loading
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
