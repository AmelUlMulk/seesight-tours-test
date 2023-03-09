import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { gql, useLazyQuery } from '@apollo/client';
import client from '../../apollo-client';
import dayjs from 'dayjs';
import { BOOKING_SEARCH, MY_TOURS_PAGE_INTERFACE } from '../../api/my-tours';
import DateAndPax from '../../components/Checkout/Date&Pax';

interface StyleProps {
  image: string;
}
const MainStyle = styled.div<StyleProps>`
  background-color: #000000d9;
  background-image: url(${props => props.image});
`;
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
export type PASSENGERPAX = {
  adults: PASSENGERINFO;
  children?: PASSENGERINFO;
  infants?: PASSENGERINFO;
  seats: number;
};

type PASSENGERINFO = {
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
      boatnew_products: data.boatnew_products[0],
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
  const background = products[0].carousel_media[0].url;

  const [bookingId, setBookingId] = useState<string | undefined>();
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
    if (bookingId !== undefined) {
      getBookings();
    }
  }, [bookingId]);

  // console.log('boatnew:', boatnew_products);
  // console.log('productavailibilty:', product_Availability);
  // console.log('slug & product:', slug, products);
  // console.log('selectedAvailibilty:', selectedAvailibility);
  // console.log('selectedSlot:', selectedTimeSlot);
  // console.log('booking data:', data);
  return (
    <MainStyle
      image={background}
      className="h-screen w-full bg-cover bg-no-repeat bg-center relative"
    >
      <div className="absolute top-0 left-0 h-screen w-full bg-[#000000d9] z-10 "></div>
      Checkout
      <DateAndPax
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        availability={selectedAvailibility}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        productAvailabities={product_Availability}
        passengerPax={passengerPax}
        setPassengerPax={setPassengerPax}
        totalPrice={totalPrice}
        slug={slug}
        name={boatnew_products[0]?.name}
      />
    </MainStyle>
  );
};

export default Checkout;
