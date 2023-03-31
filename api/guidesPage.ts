import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const GUIDES_PAGE = {
  query: gql`
    query GUIDES_PAGE {
      guidesPage {
        header
        subheader
        pageTitle: page_title
        metaDescription: meta_description
        canonical
        slug
        heroMedia: banner_media {
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        guides {
          guide {
            id
            firstName: first_name
            lastName: last_name
            position
            biography
            professional {
              name
              alt: alternativeText
              url
              fragment: caption
            }
            personal {
              name
              alt: alternativeText
              url
              fragment: caption
              type: provider_metadata
            }
          }
        }
        dayTours: day_tours {
          product {
            id
            name
            slug
            duration
            cardSnippet: snippet
            cardMessage: card_message
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
        }
        multiday {
          product {
            id
            name
            slug
            duration
            cardSnippet: snippet
            cardMessage: card_message
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
        }
      }
    }
  `
};
interface GUIDES_PAGE_INTERFACE {
  guidesPage: {
    header: string;
    subheader: string;
    pageTitle: string;
    metaDescription: string;
    canonical: string;
    slug: string;
    heroMedia: [CARDMEDIAINTERFACE];
    guides: [
      {
        guide: {
          id: string;
          firstName: string;
          lastName: string;
          position: string;
          biography: string;
          professional: [
            {
              name: any;
              alt: string;
              url: any;
              fragment: string;
            }
          ];
          personal: [
            {
              name: string;
              alt: string;
              url: string;
              fragment: string;
              type: string;
            }
          ];
        };
      }
    ];
    dayTours: {
      product: {
        id: string;
        name: string;
        slug: string;
        duration: number;
        cardSnippet: string;
        cardMessage: string;
        cardMedia: [CARDMEDIAINTERFACE];
        reviews: [
          {
            id: string;
            rating: string;
          }
        ];
      };
    };
    multiday: {
      product: {
        id: string;
        name: string;
        slug: string;
        duration: string;
        cardSnippet: string;
        cardMessage: string;
        cardMedia: [CARDMEDIAINTERFACE];
        reviews: [
          {
            id: string;
            rating: string;
          }
        ];
      };
    };
  };
}
export { GUIDES_PAGE };
export type { GUIDES_PAGE_INTERFACE };
