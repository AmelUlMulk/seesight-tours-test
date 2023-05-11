import { gql } from '@apollo/client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FETCH_PRODUCT, {
  FETCH_PRODUCT_INTERFACE,
  PRODUCTINTERFACE1
} from '../../api/tourPage';

import client from '../../apollo-client';
import 'swiper/css';
import 'swiper/css/pagination';
import HeroSwipper from '../../components/TourPage/HeroSwipper';
import TourBasics from '../../components/TourPage/TourBasics';
import Included from '../../components/TourPage/Included';
import Newsletter from '../../layouts/Newsletter/Newsletter';
import Rating from '../../components/TourPage/Rating';
import RelatedTours from '../../components/TourPage/RelatedTours';
import { PaxContext } from '../../utils/checkoutContext';
import Link from 'next/link';
import scrollToElement from '../../utils/scrollIntoView';
import Head from 'next/head';

const TourPage = ({
  product,
  reviews,
  ratingCounts,
  productReviews,
  rezdy
}: PRODUCTPAGEINTERFACE) => {
  const [showPax, setShowPax] = useState<boolean>(false);
  useEffect(() => {
    if (showPax) {
      scrollToElement('mobile-pax');
    }
  }, [showPax]);
  //@ts-ignore
  const { updateTour } = useContext(PaxContext);

  const updateTourContext = () => {
    updateTour({
      tour: product.name,
      tourId: product.id,
      tourImage: product.carousel.map(item => item.url)[0]
    });
  };

  return (
    <>
      <Head>
        <title className="text-3xl font-bold underline">
          {product.pageTitle}
        </title>
        <meta property="og:description" content={product.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={product.canonical} />
      </Head>
      <div className=" relative flex flex-col ">
        <div className="flex flex-col justify-start px-[2%] 2xl:px-[10%] mb-4 items-center  ">
          <div className="flex justify-start w-full ">
            <h1 className="w-full    text-xl lg:text-2xl xl:text-3xl  font-extrabold text-start  pt-4 xl:pt-12  mb-3 mmd:max-w-[60%]    ">
              {product.cities[0] && (
                <>
                  <span className=" font-black "> </span> {product.name}{' '}
                </>
              )}
            </h1>
          </div>
          <div className="flex items-center justify-start w-full ">
            <span className="text-sm md:text-base text-start  mmd:max-w-[60%] ">
              <Link href={`/${product?.cities[0].slug}`}>
                {product?.cities[0]?.name}
              </Link>{' '}
              {`>`} {product.name}
            </span>
            <div className="hidden mmd:block md:min-w-[40%] ">
              <TourBasics duration={product.duration} />
            </div>
          </div>
        </div>

        <HeroSwipper media={product.carousel} />
        <div className="  w-full       pl-2 2xl:px-[10%] mt-8  items-end ">
          <Included
            longDescription={product.longDescription}
            data={product.tourIncludes}
            attractions={product.attractions}
            rezdyId={rezdy[0]?.rezdy?.rezdyId}
            reviewState={reviews}
            updateTourContext={updateTourContext}
            duration={product.duration}
            showPax={showPax}
          />
        </div>

        <Rating
          productName={product.name}
          ratingCounts={ratingCounts}
          reviews={productReviews}
        />
        <RelatedTours products={product.relatedProducts} />
        <Newsletter />
        {!showPax && (
          <div className=" z-50 fixed mmd:hidden px-[2%] bg-blue-500 items-center rounded flex justify-between bottom-0 right-0  w-full py-4    text-white shadow-2xl shadow-offset-md   ">
            <p className=" text-white text-base text-center flex-1 ">
              Starting from ${product.price.toFixed(2)}
            </p>
            <button
              className=" bg-[#F15C5A] min-w-[30%]  px-4 py-2 rounded-lg"
              onClick={() => {
                setShowPax(true);
              }}
            >
              {' '}
              Check Dates
            </button>
          </div>
        )}
      </div>
    </>
  );
};
interface PRODUCTSLUGS {
  products: [
    {
      slug: string;
    }
  ];
}
interface PARAMS {
  params: {
    slug: string;
  };
}
interface PRODUCTPAGEINTERFACE {
  product: PRODUCTINTERFACE1;
  reviews: {
    average: number;
    total: number;
    source: string;
  };
  productReviews: [
    {
      rating: number;
      review: string;
      traveller: string;
      source: string;
    }
  ];
  ratingCounts: RATINGCOUNT;
  rezdy: [
    {
      rezdy: { rezdyId: string };
    }
  ];
}
export interface RATINGCOUNT {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}
export async function getStaticPaths() {
  const { data } = await client.query<PRODUCTSLUGS>({
    query: gql`
      query PRODUCTS {
        products {
          slug
          name
        }
      }
    `
  });

  return {
    paths: data.products.map(product => {
      return { params: { slug: product.slug.toString() } };
    }),
    fallback: false
  };
}
export async function getStaticProps({ params }: PARAMS) {
  const { slug } = params;
  const { data } = await client.query<FETCH_PRODUCT_INTERFACE>({
    query: FETCH_PRODUCT,
    variables: {
      slug,
      Id: slug
    }
  });
  if (!data.product) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/'
      }
    };
  }
  console.log('this is the data', data);
  const reviews = {
    average: Number(
      data.reviews.reduce((a, b) => a + b.rating, 0) / data.reviews.length
    ).toFixed(1),
    total: data.reviews.length
  };
  const ratingCounts = data.reviews.reduce(
    (acc, curr) => {
      const rating = Math.round(curr.rating); // Round the rating value to the nearest integer
      //@ts-ignore
      acc[rating]++;
      return acc;
    },
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
  );

  return {
    props: {
      product: data.product[0],
      reviews,
      productReviews: data.reviews,
      ratingCounts,
      rezdy: data.rezdy
    }
  };
}
export default TourPage;
