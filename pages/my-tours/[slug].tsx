import React from 'react';
import {
  BOOKING_SEARCH,
  BOOKING_INTERFACE,
  MY_TOURS_PAGE_INTERFACE
} from '../../api/myTour';
import Image from 'next/image';
import client from '../../apollo-client';

interface IProps {
  booking: BOOKING_INTERFACE;
  notFound: boolean;
  image: string;
}

const MyToursByID = ({
  booking: { product, passengers, REZDY, pickupLocation, customer, status },
  notFound,
  image
}: IProps) => {
  console.log('the product', image);
  return (
    <div className="min-h-screen flex py-12    ">
      {notFound ? (
        <h2>No Booking Found with the given id</h2>
      ) : (
        <div className="flex flex-col  w-full text-start font-semibold ">
          <div className="flex gap-8 justify-center bg-gray-200 py-10 w-full px-[10%]  ">
            <Image
              src={image}
              width={400}
              height={300}
              alt="mian"
              className="min-h-[50vh]"
            />
            <div className="flex">
              <h1 className="text-3xl text-black">{product.name}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
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
  console.log('the data', data);
  if (data.data.booking[0]) {
    return {
      props: {
        booking: data.data.booking[0],
        notFound: false,
        image: data.data.productDetails[0].card_media[0].url
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
