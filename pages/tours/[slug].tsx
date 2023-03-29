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
  productReviews
}: PRODUCTPAGEINTERFACE) => {
  /* const swiper = useSwiper(); */
  console.log('the reviews', product.relatedProducts);
  return (
    <div className="flex flex-col ">
      <h1 className="w-full text-2xl lg:text-3xl xl:text-5xl  font-extrabold text-center pt-12  pb-7 px-1 xl:px-8  ">
        {product.cities[0] && (
          <>
            {product.cities[0].name}
            <span className=" font-black "> {`>`}</span> {product.name}{' '}
          </>
        )}
      </h1>
      <HeroSwipper media={product.carousel} />
      <TourBasics
        price={product.price}
        duration={product.duration}
        type={product.type}
        rating={reviews.average}
        totalRatings={reviews.total}
      />
      <Included
        longDescription={product.longDescription}
        data={product.tourIncludes}
        attractions={product.attractions}
      />
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
      slug
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
      ratingCounts
    }
  };
}
export default TourPage;
