import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { FormProps } from '../StripePayment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';

interface IProps extends FormProps {
  customerId: string;
}
const StyledPhoneInput = styled(PhoneInput)`
  input {
    font-size: 1.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    padding: 0.5rem;
    color: black;
    border: 1px;
    outline-style: solid !important;
    outline-width: 2px;
    outline-color: ${props => (props.valid ? 'none' : 'red')};
  }
  select {
    background: white;
    color: black;
    option {
      color: black;
    }
  }
`;
const StyledForm = styled.form``;

const PaymentForm = (
  {
    passengerPax,
    totalPrice,
    setCustomerDetails,
    customerDetails,
    customerId,
    selectedTimeSlot,
    productId,
    setBookingId,
    setPaymentLoading,
    productName
  }: IProps,
  clientSecret: string
) => {
  // console.log('productId:', productId);
  const [phone, setPhone] = useState<string>('');
  const [validPhone, setValidPhone] = useState<boolean>(true);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setCustomerDetails({ ...customerDetails, phone });
    if (phone && phone.length > 1) {
      setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone]);
  const paymentHandler = async (e: any) => {
    console.log('paymentHandler Call');
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
    console.log('fetch Payment Intent:', paymentIntent);
    if (error) {
      setPaymentLoading(false);
      return;
    }
    const body = {
      customer_id: customerId,
      amount: totalPrice,
      currency: 'usd',
      email: customerDetails.email,
      name: customerDetails.name,
      phone: customerDetails.phone,
      adults: passengerPax.adults.count,
      children: passengerPax.children?.count,
      infants: passengerPax.infants?.count,
      tour_date: dayjs(
        dayjs(selectedTimeSlot.startTime).format('YYYY-MM-DD')
      ).format(),
      tour_time: dayjs(selectedTimeSlot.startTime).format('hh:mm:ss'),
      time_zone: 'America/Chicago',
      product_id: productId,
      passengersPrice: [
        {
          id: 1,
          title: 'Adults',
          info: 'Ages 13+',
          price: `$${passengerPax.adults.price}`,
          count: passengerPax.adults?.count
        },
        {
          id: 2,
          title: 'Children',
          info: 'Ages 5-12',
          price: `$${passengerPax.children ? passengerPax.children.price : 0}`,
          count: passengerPax.children ? passengerPax.children.count : 0
        },
        {
          id: 3,
          title: 'Infants',
          info: 'Ages under 5',
          price: `$${passengerPax.infants ? passengerPax.infants.price : 0}`,
          count: passengerPax.infants ? passengerPax.infants.count : 0
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
    if (res) {
      console.log('booking res:', res);
    }

    setPaymentLoading(false);
    setBookingId(res.data.booking_id);
  };

  return (
    <SectionWrapper title="Traveler Information & Payment Details">
      <div className="flex flex-col-reverse lg:flex-row w-full gap-4   justify-center">
        <div className=" w-full  lg:w-1/3 h-1/2">
          <Summary passengerPax={passengerPax} totalPrice={totalPrice} />
        </div>
        <div className=" w-full lg:w-1/2 text-white ">
          <StyledForm
            className="flex flex-col gap-3"
            id="main-form"
            onSubmit={e => paymentHandler(e)}
          >
            <div className="flex flex-col   ">
              <span> Name </span>
              <input
                type="text"
                className="text-2xl py-2 text-black rounded-bl-lg rounded-tr-lg    "
                required
                value={customerDetails.name}
                onChange={e =>
                  setCustomerDetails({
                    ...customerDetails,
                    name: e.target.value
                  })
                }
                minLength={2}
                maxLength={100}
              />
            </div>
            <div className="flex flex-col ">
              <span> Email </span>
              <input
                className="text-2xl py-2 text-black rounded-bl-lg rounded-tr-lg"
                type="email"
                value={customerDetails.email}
                required
                onChange={e =>
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value
                  })
                }
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="flex flex-col ">
              <span className={`${!validPhone && 'text-red-600'}`}>
                {' '}
                Phone{' '}
              </span>
              {}
              <StyledPhoneInput
                value={phone}
                onChange={setPhone}
                defaultCountry="CA"
                withCountryCallingCode
                international
                valid={validPhone}
              />
            </div>
            <div className="flex relative justify-center items-center  ">
              {!clientSecret && (
                <svg
                  className="animate-spin h-48  w-48  mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
              )}
            </div>
            {clientSecret && (
              //@ts-ignore
              <PaymentElement id="payment-element" />
            )}
          </StyledForm>
        </div>
      </div>
    </SectionWrapper>
  );
};
PaymentForm.defaultProps = {
  productName: ''
};

export default PaymentForm;
