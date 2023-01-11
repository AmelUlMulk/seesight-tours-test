import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

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
    }
  `
};
interface CITIES_PAGE_INTERFACE {
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
    cities: [
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
  };
}
export { CITIES_PAGE };
export type { CITIES_PAGE_INTERFACE };