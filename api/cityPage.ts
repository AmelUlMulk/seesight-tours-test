import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const FETCH_CITY = {
  query: gql`
    query FETCH_CITY($slug: JSON!) {
      cities(where: { slug: $slug }) {
        name
        slug
        metaDescription: meta_description
        canonical
        pageTitle: page_title
        header
        subheader
        shortDescription: short_description
        longDescription: long_description
        FAQ
        featured
        heroMedia: media_library {
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        products {
          id: boat_id
          name
          slug
          snippet
          duration
          cardMedia: card_media {
            name
            alt: alternativeText
            url
            fragment: caption
            type: provider_metadata
          }
          reviews {
            id
            rating
          }
        }
        attractions {
          id
          name
          slug
          snippet
          cardMedia: card_media {
            name
            alt: alternativeText
            url
            fragment: caption
            type: provider_metadata
          }
          heroMedia: media_library {
            name
            alt: alternativeText
            url
            fragment: caption
            type: provider_metadata
          }
          city {
            id
            name
            slug
          }
        }
      }
    }
  `
};
interface CITY_PAGE_INTERFACE {
  cities: [CITYDATEINTERFACE];
}
interface ATTRACTIONSINTERFACE {
  id: string;
  name: string;
  slug: string;
  snippet: string;
  cardMedia: [CARDMEDIAINTERFACE];
  heroMedia: [CARDMEDIAINTERFACE];
  city: {
    id: string;
    name: string;
    slug: string;
  };
}
interface CITYDATEINTERFACE {
  name: string;
  slug: string;
  metaDescription: string;
  canonical: string;
  pageTitle: string;
  header: string;
  subheader: string;
  shortDescription: string;
  longDescription: string;
  FAQ: [string];
  featured: string;
  heroMedia: [CARDMEDIAINTERFACE];
  products: [
    {
      id: string;
      name: string;
      slug: string;
      snippet: string;
      duration: string;
      cardMedia: [CARDMEDIAINTERFACE];
      reviews: {
        id: string;
        rating: string;
      };
    }
  ];
  attractions: [
    {
      id: string;
      name: string;
      slug: string;
      snippet: string;
      cardMedia: [CARDMEDIAINTERFACE];
      heroMedia: [CARDMEDIAINTERFACE];
      city: {
        id: string;
        name: string;
        slug: string;
      };
    }
  ];
}
export { FETCH_CITY };
export type { CITY_PAGE_INTERFACE, ATTRACTIONSINTERFACE, CITYDATEINTERFACE };
