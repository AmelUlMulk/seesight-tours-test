import { gql } from '@apollo/client';
import React, { useRef } from 'react';
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

const TourPage = ({
  product,
  reviews,
  ratingCounts,
  productReviews,
  rezdy
}: PRODUCTPAGEINTERFACE) => {
  /* const swiper = useSwiper(); */
  return (
    <div className="  flex flex-col ">
      <div className="flex justify-between px-[2%] 2xl:px-[10%] mb-4  ">
        <div className="flex flex-col ">
          <h1 className="w-full text-xl lg:text-2xl xl:text-4xl  font-extrabold text-start  pt-4 xl:pt-12  mb-3   ">
            {product.cities[0] && (
              <>
                <span className=" font-black "> </span> {product.name}{' '}
              </>
            )}
          </h1>
          <span className="text-lg">
            {product.cities[0].name} {`>`} {product.name}
          </span>
        </div>
        <TourBasics
          price={product.price}
          duration={product.duration}
          type={product.type}
          rating={reviews.average}
          totalRatings={reviews.total}
          slug={product.slug}
        />
      </div>

      <HeroSwipper media={product.carousel} />
      <div className="  w-full       pl-2 2xl:px-[10%] mt-8  items-end     ">
        <Included
          longDescription={product.longDescription}
          data={product.tourIncludes}
          attractions={product.attractions}
          rezdyId={rezdy[0].rezdy.rezdyId}
          reviewState={reviews}
        />
      </div>
      <h2 className="w-full px-[2%] 2xl:px-[10%] text-black text-xl md:text-3xl font-bold  ">
        {product.name}
      </h2>
      <Rating
        productName={product.name}
        ratingCounts={ratingCounts}
        reviews={productReviews}
      />
      <RelatedTours products={product.relatedProducts} />
      <Newsletter />
    </div>
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
  };
  productReviews: [
    {
      rating: number;
      review: string;
      traveller: string;
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
