import { gql } from '@apollo/client';
import {
  CARDMEDIAINTERFACE,
  GUIDESINTERFACE,
  AGGREGATEINTERFACE
} from './commonInterfaces';

export const HOMEPAGE = gql`
  query HOMEPAGE($guides: Boolean!) {
    homePage {
      header
      subheader
      pageTitle: page_title
      metaDescription: meta_description
      canonical
      cities {
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
    guides @include(if: $guides) {
      id
      firstName: first_name
      lastName: last_name
      biography
      position
      professional {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
      personal {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
    }
    totalDayTours: productsConnection(where: { type: "DAYTOUR" }) {
      aggregate {
        count
      }
    }
    guidesTotal: guidesConnection @include(if: $guides) {
      aggregate {
        totalCount
      }
    }
    citiesTotal: citiesConnection {
      aggregate {
        totalCount
      }
    }
  }
`;
interface HOMEPAGEINTERFACE {
  homePage: {
    header: string;
    subheader: string;
    pageTitle: string;
    metaDescription: string;
    canonical: string;
    cities: [
      {
        city: {
          cardMedia: CARDMEDIAINTERFACE;
          id: string;
          name: string;
          slug: string;
          cardSnippet: string;
        };
      }
    ];
  };
  totalDayTours: AGGREGATEINTERFACE;
  guidesTotal: AGGREGATEINTERFACE;
  citiesTotal: AGGREGATEINTERFACE;
  guides: [GUIDESINTERFACE];
}
export type { HOMEPAGEINTERFACE };
