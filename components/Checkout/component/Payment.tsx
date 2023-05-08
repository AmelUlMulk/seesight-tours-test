/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';
import UserForm from './UserForm';
import Image from 'next/image';
import { Detail } from 'react-calendar';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { PaxContext } from '../../../utils/checkoutContext';
import dayjs from 'dayjs';
import StripeCheckout from './StripeCheckout';

interface Details {
  next: () => void;
  back: () => void;
  stripePromise: any;
  setBookingId: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const PaymentSection = ({
  next,
  stripePromise,
  back,
  setBookingId
}: Details) => {
  //@ts-ignore
  const { pax, tour, user } = useContext(PaxContext);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

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
      tour: tour.tour,
      tourDate: dayjs(pax.selectedTimeSlot.startTime).format('MMMM DD ,YYYY'),
      tourTime: dayjs(pax.selectedTimeSlot.startTime).format('HH:MM:ss')
    };
    createPaymentIntent(body);
  }, []);

  const handleFormSubmit = async (
    e: React.FormEvent,
    elements: any,
    stripe: any
  ) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setPaymentLoading(true);
    const payment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://www.seesight-tours.com/my-tours'
      },
      redirect: 'if_required'
    });
    const { error, paymentIntent } = payment;
    if (error) {
      setPaymentLoading(false);
      return;
    }

    const body = {
      customer_id: customerId,
      amount: pax.totalPrice,
      currency: 'usd',
      email: user.email,
      name: user.name,
      phone: user.phone,
      adults: pax.adults.count,
      children: pax.children?.count,
      infants: pax.infants?.count,
      tour_date: dayjs(
        dayjs(pax.selectedTimeSlot.startTime).format('YYYY-MM-DD')
      ).format(),
      tour_time: dayjs(pax.selectedTimeSlot.startTime).format('hh:mm:ss'),
      time_zone: 'America/Chicago',
      product_id: tour.tourId,
      passengersPrice: [
        {
          id: 1,
          title: 'Adults',
          info: 'Ages 13+',
          price: `$${pax.adults.price}`,
          count: pax.adults?.count
        },
        {
          id: 2,
          title: 'Children',
          info: 'Ages 5-12',
          price: `$${pax.children ? pax.children.price : 0}`,
          count: pax.children ? pax.children.count : 0
        },
        {
          id: 3,
          title: 'Infants',
          info: 'Ages under 5',
          price: `$${pax.infants ? pax.infants.price : 0}`,
          count: pax.infants ? pax.infants.count : 0
        }
      ],
      payment_info: paymentIntent
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PAYMENT_API}/booking`,
      {
        ...body
      }
    );
    setPaymentLoading(false);
    setBookingId(res.data.booking_id);
  };

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe'
    }
  };
  return (
    <SectionWrapper title="Traveler Payment Details">
      <div className=" flex-col flex  md:flex-row items-start flex-wrap md:gap-4 ">
        {/* <div className="flex flex-col-reverse md:gap-4 md:flex-row   justify-start  "> */}
        <Summary />
        {!clientSecret ? (
          <div className="  w-full flex    justify-center items-center  ">
            <div className=" flex justify-center items-center    h-1/2   w-5/6">
              <h4 className="animate-pulse text-4xl text-black">Loading....</h4>
            </div>
          </div>
        ) : (
          //@ts-ignore
          <Elements stripe={stripePromise} options={options}>
            <StripeCheckout
              handleFormSubmit={handleFormSubmit}
              back={back}
              paymentLoading={paymentLoading}
            />
          </Elements>
        )}
        {/* </div> */}

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
