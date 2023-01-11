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
interface ATTRACTION_SLUGS_INTERFACE {
  cities: [attractions: [{ slug: string }]];
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
const ATTRACTION_PAGE_SLUGS = gql`
  query ATTRACTION_SLUGS {
    cities {
      attractions {
        slug
      }
    }
  }
`;
const ATTRACTION_PAGE = gql`
  query FETCH_ATTRACTION($slug: JSON!) {
    attractions(where: { slug: $slug }) {
      name
      canonical
      metaDescription: meta_description
      longDescription: long_description
      hoursOfOperation: hours_of_operation
      city {
        id
        name
        slug
      }
      products {
        id: boat_id
        name
        slug
        duration
        price
        cardMessage: card_message
        cardSnippet: snippet
        cardMedia: card_media {
          name
          alt: alternativeText
          url
          fragment: caption
        }
        reviews {
          id
          rating
        }
      }
      address
      cardMedia: card_media {
        name
        alt: alternativeText
        url
        fragment: caption
      }
      heroMedia: media_library {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
    }
  }
`;
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
  const [imagesAr, setimagesAr] = useState<Array<Record<string, unknown>>>([]);
  const router = useRouter();
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
  useEffect(() => {
    let img = [] as any;
    if (cardMedia?.length > 0) {
      cardMedia.forEach((item: Record<string, any>, index: number) => {
        img.push({
          key: index + 1,
          imageURL: item.url
        });
      });
    } else {
      heroMedia?.length > 0 &&
        heroMedia.forEach((item: Record<string, any>, index: number) => {
          img.push({
            key: index + 1,
            imageURL: item.url
          });
        });
    }
    if (img.length > 0) {
      setimagesAr(img);
    }
  }, [heroMedia]);
  return (
    <div id="Attractions" className="px-16">
      <div id="header">
        <p className="text-xl py-3">
          <span
            className="cursor-pointer hover:text-slate-600"
            onClick={() => Router.push(`/${router.query.slug}`)}
          >
            {router.query && router.query.slug}
          </span>
          {' > '} <span>{router.query.slug2}</span>{' '}
        </p>
      </div>
      <div className="md:grid md:grid-cols-2 sm:block">
        <div id="Image" className="px-3">
          <Carousel imagesArr={imagesAr} />
          <div id="description" className="flex flex-col">
            <div className="flex justify-between pt-2">
              {name && <h1 className="text-2xl font-[500]">{name}</h1>}
              {city && <p className="py-1 font-[600]">{city.name}</p>}
            </div>
            <div id="long-description" className="mt-5">
              {longDescription && (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {longDescription}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
        <LocationMap
          name={name}
          address={address}
          data={{ hoursOfOperation, address }}
        />
      </div>
    </div>
  );
};

export default SubSlug;
