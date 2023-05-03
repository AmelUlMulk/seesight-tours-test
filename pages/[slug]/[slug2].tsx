import Image from 'next/image';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import client from '../../apollo-client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Carousel from '../../components/ProductPage/caroursel';
import LocationMap from '../../components/Attraction/locationmap';
import PageHero from '../../layouts/PageHero';
import {
  ATTRACTION_PAGE,
  ATTRACTION_PAGE_SLUGS,
  ATTRACTION_SLUGS_INTERFACE
} from '../../api/attraction';
import styled from 'styled-components';
import Head from 'next/head';

const StyleMarkdown = styled.div`
  color: #333333;
  h2 {
    font-size: 28px;
    font-weight: 600;
    @media (max-width: 1024px) {
      font-size: 20px;
    }
    @media (max-width: 640px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 18px;
    font-weight: 400;
    @media (max-width: 1024px) {
      font-size: 14px;
    }
    @media (max-width: 640px) {
      font-size: 12px;
    }
  }
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .cta-two-tone {
    background-image: url('https://res.cloudinary.com/see-sight-tours/image/upload/v1669883122/dark-back_tqnwfs.png');
    width: 70%;
    @media (max-width: 1200px) {
      width: 100%;
    }
    min-height: 200px;
    border-radius: 20px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      margin-top: 1rem;
      color: white;
      padding: 0 0.5rem;
      font-size: 29px;
      text-align: center;
      min-height: 50%;
      position: relative;
      @media (max-width: 900px) {
        text-align: center;
      }
      @media (max-width: 500px) {
        text-align: center;
        height: 80%;
        font-size: 24px;
      }
    }
    .button-container {
      width: 100%;
      display: flex;
      background-image: url('https://res.cloudinary.com/see-sight-tours/image/upload/v1669883122/light-water_pjgzcg.png');
      background-position: center;
      justify-content: center;
      position: relative;
      min-height: 30%;
      border-radius: 0px 0px 20px 20px;
      @media (max-width: 500px) {
        height: 20%;
      }
      a {
        position: absolute;
        top: -35%;
        background: #fd5d5a !important;
        border-radius: 20px;
        width: 45%;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white !important;
        font-size: 21px;
        font-weight: bold;
        @media (max-width: 500px) {
          width: 60%;
          height: 60%;
          font-size: 19px;
        }
        &:hover {
          background: #fd3f3c;
        }
      }
    }
  }
`;
interface IProps {
  attraction: ATTRACTION;
  params: Record<string, any>;
  slug: string;
}
interface CARDMEDIAINTERFACE {
  name: string;
  alt: string;
  url: string;
  fragment: string;
  type: string;
}
interface PRODUCTINTERFACE {
  id: string;
  name: string;
  slug: string;
  duration: string;
  price: string;
  cardMessage: string;
  cardSnippet: string;
  cardMedia: [CARDMEDIAINTERFACE];
  reviews: [
    {
      id: string;
      rating: number;
    }
  ];
}
interface SLUG_INTERFACE {
  slug: string;
}

interface ATTRACTION_PAGE_INTERFACE {
  attractions: [ATTRACTION];
}
interface ATTRACTION {
  name: string;
  canonical: string;
  metaDescription: string;
  longDescription: string;
  hoursOfOperation: string;
  address: string;
  slug: string;
  city: {
    id: string;
    name: string;
    slug: string;
  };
  products: [PRODUCTINTERFACE];
  cardMedia: [CARDMEDIAINTERFACE];
  heroMedia: [CARDMEDIAINTERFACE];
}

export async function getStaticPaths() {
  const { data } = await client.query<ATTRACTION_SLUGS_INTERFACE>({
    query: ATTRACTION_PAGE_SLUGS
  });
  const arr: any = [];
  const slugArr: Array<Record<string, string>> = [];
  const { cities: [...attractions] = [] } = data;
  attractions?.forEach((atr: any) => {
    atr.attractions.forEach((atr1: any) => {
      arr.push(atr1);
    });
  });
  arr.forEach((attr: any) => {
    slugArr.push({
      slug1: attr.slug.split('/')[0],
      slug2: attr.slug.split('/')[1]
    });
  });
  const paths = slugArr.map((slg: Record<string, string>) => {
    return {
      params: {
        slug: `${slg.slug1}`,
        slug2: `${slg.slug2}`
      }
    };
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: IProps) {
  const slug = `${params.slug}/${params.slug2}`;
  const {
    data: { attractions: [attraction] = [] } = {} as ATTRACTION_PAGE_INTERFACE,
    loading,
    error
  } = await client.query<ATTRACTION_PAGE_INTERFACE>({
    query: ATTRACTION_PAGE,
    variables: {
      slug
    }
  });
  return {
    props: {
      attraction
    }
  };
}
const SubSlug = ({ attraction }: IProps) => {
  const {
    name,
    canonical,
    metaDescription,
    longDescription,
    hoursOfOperation,
    address,
    city,
    cardMedia,
    heroMedia
  } = attraction || ({} as ATTRACTION);
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta
          property="og:description"
          content={metaDescription}
          key="metadescription"
        />
        <link href={canonical} rel="canonical" key="canonical" />
      </Head>
      <PageHero
        title="Hornblower Niagara Cruises"
        snippet="Niagara Falls, Canada"
        media="/attractionBanner.jpg"
        video={false}
      />
      <LocationMap
        name={name}
        address={address}
        data={{ hoursOfOperation, address }}
      />
      <div id="Attractions" className="px-10 sm:px-16">
        <StyleMarkdown id="long-description" className="mt-5">
          {longDescription && (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {longDescription}
            </ReactMarkdown>
          )}
        </StyleMarkdown>
      </div>
    </>
  );
};

export default SubSlug;
