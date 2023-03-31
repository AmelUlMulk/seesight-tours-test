import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';
import { HEADER_STATS_INTERFACE } from './headerstats';

const CITIES_PAGE = {
  query: gql`
    query CITIES_PAGE {
      citiesPage {
        header
        subheader
        pageTitle: page_title
        metaDescription: meta_description
        heroMedia: banner_media {
          name
          alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        canonical
        featured: featured_cities {
          city {
            id
            name
            slug
            cardSnippet: card_snippet
            cardMedia: card_media {
              name
              alt: alternativeText
              url
              fragment: caption
              type: provider_metadata
            }
          }
        }
        cities: all_cities {
          city {
            id
            name
            slug
            cardSnippet: card_snippet
            cardMedia: card_media {
              name
              alt: alternativeText
              url
              fragment: caption
              type: provider_metadata
            }
          }
        }
      }
      boatnew_booking_aggregate {
        aggregate {
          count
        }
      }
      boatnew_customers_aggregate {
        aggregate {
          count
        }
      }
      strapi_reviews {
        rating
      }
    }
  `
};

const CITIES = {
  query: gql`
    query CITIES_PAGE {
      citiesPage {
        featured: featured_cities {
          city {
            id
            name
            slug
            cardSnippet: card_snippet
            cardMedia: card_media {
              name
              alt: alternativeText
              url
              fragment: caption
              type: provider_metadata
            }
          }
        }
      }
    }
  `
};
interface CITIES_PAGE_INTERFACE extends HEADER_STATS_INTERFACE {
  citiesPage: {
    header: string;
    subheader: string;
    pageTitle: string;
    metaDescription: string;
    heroMedia: [CARDMEDIAINTERFACE];
    canonical: string;
    featured: [
      {
        city: {
          id: string;
          name: string;
          slug: string;
          cardSnippet: string;
          cardMedia: [CARDMEDIAINTERFACE];
        };
      }
    ];
    cities: [CityInterface];
  };
  averageReview: number;
  customers: string;
  bookings: string;
}
export interface CityInterface {
  city: {
    id: string;
    name: string;
    slug: string;
    cardSnippet: string;
    cardMedia: [CARDMEDIAINTERFACE];
  };
}
export { CITIES_PAGE, CITIES };
export type { CITIES_PAGE_INTERFACE };
