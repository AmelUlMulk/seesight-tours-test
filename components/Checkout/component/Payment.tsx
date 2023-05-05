/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';
import UserForm from './UserForm';
import Image from 'next/image';
import { Detail } from 'react-calendar';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { PaxContext } from '../../../utils/checkoutContext';
import dayjs from 'dayjs';

interface Details {
  next: () => void;
  back: () => void;
  stripePromise: any;
}
const PaymentSection = ({ next, stripePromise, back }: Details) => {
  //@ts-ignore
  const { pax, tour } = useContext(PaxContext);

  const [clientSecret, setClientSecret] = useState(null);

  const [paymentIntent, setPaymentIntent] = useState(null);

  const [customerId, setCustomerId] = useState('');

  const createPaymentIntent = async (body: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_PAYMENT_API}/create-payment-intent`,
        {
          ...body
        }
      );
      setClientSecret(res.data.clientSecret);
      setPaymentIntent(res.data.paymentIntent);
      setCustomerId(res.data.customer);
    } catch (error) {}
  };

  useEffect(() => {
    const body = {
      amount: pax.totalPrice,
      currency: 'usd',
      tour: tour.name,
      tourDate: dayjs(pax.selectedTimeSlot.startTime).format('MMMM DD ,YYYY'),
      tourTime: dayjs(pax.selectedTimeSlot.startTime).format('HH:MM:ss')
    };
    createPaymentIntent(body);
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe'
    }
  };
  return (
    <SectionWrapper title="Traveler Payment Details">
      <div className=" flex-col flex  md:flex-row items-start flex-wrap md:gap-4 ">
        <Summary />
        {!clientSecret ? (
          <div className=" h-screen w-full flex    justify-center items-center  ">
            <div className=" flex justify-center items-center    h-1/2   w-5/6">
              <h4 className="animate-pulse text-4xl text-black">Loading....</h4>
            </div>
          </div>
        ) : (
          //@ts-ignore
          <Elements stripe={stripePromise} options={options}>
            <form className="w-1/2">
              <PaymentElement id="payment-element" />
              <div className="flex w-full justify-between mt-8  ">
                <button
                  className=" bg-[#F15C5A]  py-3 rounded-md w-1/3 text-white   "
                  onClick={() => back()}
                >
                  {' '}
                  Back{' '}
                </button>
                <button
                  className="border-2 border-[#F15C5A]  py-3 rounded-md w-1/3  "
                  type="submit"
                >
                  Pay
                </button>
              </div>
            </form>
          </Elements>
        )}

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

export default PaymentSection;
