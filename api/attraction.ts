import { gql } from '@apollo/client';
import type { CARDMEDIAINTERFACE, PRODUCTINTERFACE } from './commonInterfaces';

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
const ATTRACTION_PAGE_SLUGS = gql`
  query ATTRACTION_SLUGS {
    cities {
      attractions {
        slug
      }
    }
  }
`;
interface ATTRACTION_PAGE_INTERFACE {
  attractions: [ATTRACTION];
}
interface ATTRACTION_SLUGS_INTERFACE {
  cities: [attractions: [{ slug: string }]];
}
interface ATTRACTION {
  name: string;
  canonical: string;
  metaDescription: string;
  longDescription: string;
  hoursOfOperation: string;
  address: string;
  city: {
    id: string;
    name: string;
    slug: string;
  };
  products: [PRODUCTINTERFACE];
  cardMedia: [CARDMEDIAINTERFACE];
  heroMedia: [CARDMEDIAINTERFACE];
}

export { ATTRACTION_PAGE, ATTRACTION_PAGE_SLUGS };
export type {
  ATTRACTION_PAGE_INTERFACE,
  ATTRACTION,
  ATTRACTION_SLUGS_INTERFACE
};
