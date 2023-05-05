import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { gql, useLazyQuery } from '@apollo/client';
import client from '../../apollo-client';
import { loadStripe } from '@stripe/stripe-js';
import dayjs from 'dayjs';
import { BOOKING_SEARCH, MY_TOURS_PAGE_INTERFACE } from '../../api/my-tours';
import DateAndPax from '../../components/Checkout/Date&Pax';
import useComponentSwipper from '../../components/Checkout/useComponentSwiper';
import StripePayment from '../../components/Checkout/StripePayment';
import ConfirmBooking from '../../components/Checkout/ConfirmBooking';
import Steps from '../../components/Checkout/component/steps';
import Thankyou from '../../components/Checkout/Thanks';
import Head from 'next/head';
import Details from '../../components/Checkout/component/Details';

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
export async function getServerSideProps({ params: { slug } }: CONTEXT) {
  const { data } = await client.query<any>({
    query: gql`
      query PRODUCT($slug: String!) {
        boatnew_products(where: { slug: { _eq: $slug } }) {
          name
          id
          rezdy {
            rezdyId: rezdy_id
          }
          cities_products {
            city {
              time_zone
            }
          }
        }
        products(where: { slug: $slug }) {
          carousel_media: card_media {
            url
          }
        }
      }
    `,
    variables: {
      slug
    }
  });
  if (data.boatnew_products[0] === undefined) {
    return {
      props: {
        boatnew_products: data.boatnew_products
      },
      redirect: {
        statusCode: 301,
        destination: '/'
      }
    };
  }
  const product_Availability = await axios.post(
    `${process.env.NEXT_PUBLIC_AVAILABILITY_URI}/availability`,
    {
      code: data.boatnew_products[0].rezdy.rezdyId,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(12, 'months').format('YYYY-MM-DD')
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
  return {
    props: {
      boatnew_products: data.boatnew_products,
      product_Availability: product_Availability.data.data,
      slug,
      products: data.products
    }
  };
}
const Checkout = ({
  boatnew_products,
  product_Availability,
  slug,
  products
}: PROPSDATA) => {
  const stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE));
  const background = products[0].carousel_media[0].url;

  const [bookingId, setBookingId] = useState<string | undefined>();
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const [confirmationLoading, setConfirmationLoading] =
    useState<boolean>(false);
  const [thankyou, setThankYou] = useState<boolean>(false);

  const [customerDetails, setCustomerDetails] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const [getBookings, { data, loading, error }] =
    useLazyQuery<MY_TOURS_PAGE_INTERFACE>(BOOKING_SEARCH, {
      variables: {
        id: bookingId
      }
    });

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(product_Availability[0].startTime).format('YYYY-MM-DD')
  );
  const [selectedAvailibility, setSelectedAvailabilty] = useState<
    AVAILABILITY[]
  >(() =>
    product_Availability.filter(
      date => dayjs(date.startTime).format('YYYY-MM-DD') === selectedDate
    )
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AVAILABILITY>(
    selectedAvailibility[0]
  );

  const [passengerPax, setPassengerPax] = useState<PASSENGERPAX>(() => {
    return {
      adults: {
        count: selectedTimeSlot.seatsAvailable > 1 ? 1 : 0,
        label: selectedTimeSlot.prices[0].label,
        price: selectedTimeSlot.prices[0].price,
        title: selectedTimeSlot.prices[0].label
      },
      infants: selectedTimeSlot.prices[1]
        ? {
            count: 0,
            label: selectedTimeSlot.prices[1].label,
            price: selectedTimeSlot.prices[1].price,
            title: selectedTimeSlot.prices[1].label
          }
        : undefined,
      children: selectedTimeSlot.prices[2]
        ? {
            count: 0,
            label: selectedTimeSlot.prices[2].label,
            price: selectedTimeSlot.prices[2].price,
            title: selectedTimeSlot.prices[2].label
          }
        : undefined,
      seats: selectedTimeSlot.seats
    };
  });
  const [totalPrice, setTotalPrice] = useState<number>(() =>
    Number(passengerPax.adults.price)
  );
  //useEffect()
  useEffect(() => {
    setSelectedAvailabilty(() =>
      product_Availability.filter(
        date => dayjs(date.startTime).format('YYYY-MM-DD') === selectedDate
      )
    );
  }, [selectedDate]);

  useEffect(() => {
    setSelectedTimeSlot(selectedAvailibility[0]);
  }, [selectedAvailibility]);

  useEffect(() => {
    setPassengerPax({
      adults: {
        count: selectedTimeSlot.seatsAvailable > 1 ? 1 : 0,
        label: selectedTimeSlot.prices[0].label,
        price: selectedTimeSlot.prices[0].price,
        title: selectedTimeSlot.prices[0].label
      },
      infants: selectedTimeSlot.prices[1]
        ? {
            count: 0,
            label: selectedTimeSlot.prices[1].label,
            price: selectedTimeSlot.prices[1].price,
            title: selectedTimeSlot.prices[1].label
          }
        : undefined,
      children: selectedTimeSlot.prices[2]
        ? {
            count: 0,
            label: selectedTimeSlot.prices[2].label,
            price: selectedTimeSlot.prices[2].price,
            title: selectedTimeSlot.prices[2].label
          }
        : undefined,
      seats: selectedTimeSlot.seatsAvailable
    });
  }, [selectedTimeSlot]);
  useEffect(() => {
    const adults =
      passengerPax.adults.count * Number(passengerPax.adults.price);
    const children = passengerPax.children
      ? passengerPax.children.count * Number(passengerPax.children.price)
      : 0;
    const infants = passengerPax.infants
      ? passengerPax.infants.count * Number(passengerPax.infants.price)
      : 0;
    setTotalPrice(() => Number(adults + children + infants));
  }, [passengerPax]);
  useEffect(() => {
    if (bookingId) {
      next();
    }
  }, [bookingId]);
  useEffect(() => {
    if (bookingId !== undefined) {
      getBookings();
    }
  }, [bookingId]);
  const tiggerNext = () => {
    next();
  };
  const { component, currentComponentIndex, next, back } = useComponentSwipper([
    <Details key="details" next={tiggerNext} />,
    <StripePayment
      key="form"
      stripePromise={stripePromise}
      passengerPax={passengerPax}
      totalPrice={totalPrice}
      productName={boatnew_products[0]?.name}
      customerDetails={customerDetails}
      setCustomerDetails={setCustomerDetails}
      selectedTimeSlot={selectedTimeSlot}
      productId={boatnew_products[0]?.id}
      timeZone={boatnew_products[0]?.cities_products[0].city.time_zone}
      setBookingId={setBookingId}
      setPaymentLoading={setPaymentLoading}
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
        <title>{`Checkout | ${slug}`}</title>
      </Head>
      <div className="min-h-[130vh] h-auto w-full bg-cover bg-no-repeat bg-center relative bg-white ">
        {thankyou && <Thankyou open={thankyou} close={setThankYou} />}
        <Steps currentStepIndex={currentComponentIndex} />
        {component}
        <ButtonDiv>
          {currentComponentIndex > 0 && currentComponentIndex !== 2 && (
            <button className="back" onClick={back}>
              Back
            </button>
          )}

          {currentComponentIndex === 1 && (
            <button type="submit" form="main-form">
              {!paymentLoading && <> PAY </>}
              {paymentLoading && (
                <span className=" animate-pulse text-xl  ">
                  Processing Please wait
                </span>
              )}
            </button>
          )}
          {currentComponentIndex === 2 && (
            <button
              className="back"
              onClick={() => {
                setThankYou(true);
              }}
            >
              Confirm Later
            </button>
          )}
          {currentComponentIndex === 2 && (
            <button type="submit" form="confirmation-form">
              {!confirmationLoading && <> Confirm </>}
              {confirmationLoading && (
                <span className=" animate-pulse text-xl  ">Confirming</span>
              )}
            </button>
          )}
        </ButtonDiv>
      </div>
    </>
  );
};

export default Checkout;
