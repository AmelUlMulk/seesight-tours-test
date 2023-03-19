import { gql } from '@apollo/client';
import React, { useRef } from 'react';
import FETCH_PRODUCT, {
  FETCH_PRODUCT_INTERFACE,
  PRODUCTINTERFACE1
} from '../../api/tourPage';
import Image from 'next/image';
import client from '../../apollo-client';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Navigation } from 'swiper';
import styled from 'styled-components';
import HeroSwipper from '../../components/TourPage/HeroSwipper';
import TourBasics from '../../components/TourPage/TourBasics';
import Included from '../../components/TourPage/Included';
import Newsletter from '../../layouts/Newsletter/Newsletter';

const TourPage = ({ product, reviews }: PRODUCTPAGEINTERFACE) => {
  /* const swiper = useSwiper(); */

  console.log('this is the thing', product);

  SwiperCore.use([Navigation]);

  return (
    <div className="flex flex-col ">
      <h1 className="w-full text-2xl lg:text-3xl xl:text-5xl  font-extrabold text-center pt-12  pb-7  ">
        {product.cities[0].name} <span className=" font-black ">{`>`}</span>{' '}
        {product.name}{' '}
      </h1>
      <HeroSwipper media={product.carousel} />
      <TourBasics
        price={product.price}
        duration={product.duration}
        type={product.type}
        rating={reviews.average}
        totalRatings={reviews.total}
      />
      <Included data={product.tourIncludes} attractions={product.attractions} />
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
}
export async function getStaticPaths() {
  const { data } = await client.query<PRODUCTSLUGS>({
    query: gql`
      query PRODUCTS {
        products: boatnew_products(where: { slug: { _neq: "null" } }) {
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
    fallback: true
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
  console.log('these are the reviews', data.reviews);
  const reviews = {
    average: Number(
      data.reviews.reduce((a, b) => a + b.rating, 0) / data.reviews.length
    ).toFixed(1),
    total: data.reviews.length
  };
  console.log('these are the reviews', reviews);
  return {
    props: {
      product: data.product[0],
      reviews
    }
  };
}
export default TourPage;
