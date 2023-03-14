import React, { useState, useEffect } from 'react';
import {
  AVAILABILITY,
  CustomerInfo,
  PASSENGERPAX
} from '../../pages/checkout/[slug]';
import dayjs from 'dayjs';
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import PaymentForm from './component/PaymentForm';
export interface FormProps {
  passengerPax: PASSENGERPAX;
  totalPrice: number;
  productName: string;
  stripePromise: any;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  customerDetails: CustomerInfo;
  selectedTimeSlot: AVAILABILITY;
  productId: string;
  timeZone: string;
  setBookingId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPaymentLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const StripePayment = ({
  passengerPax,
  totalPrice,
  productName,
  productId,
  selectedTimeSlot,
  timeZone,
  setBookingId,
  setPaymentLoading,
  customerDetails,
  setCustomerDetails,
  stripePromise
}: FormProps) => {
  const [clientSecret, setClientSecret] = useState(null);

  const [customerId, setCustomerId] = useState('');

  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    setCustomerDetails({
      name: '',
      email: '',
      phone: ''
    });
    setPaymentLoading(false);
  }, []);

  const createPaymentIntent = async (body: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_PAYMENT_API}/create-payment-intent`,
        {
          ...body
        }
      );
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_PAYMENT_API}/create-payment-intent`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(body)
      //   }
      // );
      // const data = await res.json();
      console.log('res:', res.data);
      setClientSecret(res.data.clientSecret);
      setPaymentIntent(res.data.paymentIntent);
      setCustomerId(res.data.customer);
    } catch (error) {
      console.log('error while creating payment Intent');
    }
  };
  useEffect(() => {
    const body = {
      amount: totalPrice,
      currency: 'usd',
      tour: productName ? productName : '',
      tourDate: dayjs(selectedTimeSlot.startTime).format('MMMM DD ,YYYY'),
      tourTime: dayjs(selectedTimeSlot.startTime).format('HH:MM:ss')
    };
    createPaymentIntent(body);
  }, []);
  const options = {
    clientSecret,
    appearance: {
      theme: 'night',
      labels: 'floating',
      variables: {
        colorTextSecondary: 'white',
        colorText: 'black',
        colorPrimary: 'black',
        fontFamily: 'poppins',
        colorBackground: 'white',
        colorDanger: 'red'
      }
    }
  };
  // console.log('client Secret:', clientSecret);
  // console.log('Payment Intent:', paymentIntent);
  // console.log('Customer Id:', customerId);
  return (
    <div className="text-white relative z-50">
      {!clientSecret && (
        <div className=" h-screen w-full flex    justify-center items-center  ">
          <div className=" flex justify-center items-center    h-1/2   w-5/6">
            <h4 className="animate-pulse text-4xl text-white">Loading....</h4>
          </div>
        </div>
      )}
      {clientSecret && (
        // @ts-ignore
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            passengerPax={passengerPax}
            totalPrice={totalPrice}
            stripePromise={stripePromise}
            setCustomerDetails={setCustomerDetails}
            customerDetails={customerDetails}
            customerId={customerId}
            selectedTimeSlot={selectedTimeSlot}
            productId={productId}
            timeZone={timeZone}
            setBookingId={setBookingId}
            setPaymentLoading={setPaymentLoading}
          />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
