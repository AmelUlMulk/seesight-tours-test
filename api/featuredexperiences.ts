import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const FEATUREDEXPERIENCES = gql`
  query FEATUREDEXPERIENCES(
    $dayTours: Boolean!
    $multiday: Boolean!
    $airportTransfers: Boolean!
  ) {
    homePage {
      header
      subheader
      allThings: all_things_to_do {
        product {
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
            type: provider_metadata
          }
          carousel: carousel_media {
            id
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
      dayTours: one_day_tours @include(if: $dayTours) {
        product {
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
            type: provider_metadata
          }
          carousel: carousel_media {
            id
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
      multiday: multi_day_tours @include(if: $multiday) {
        product {
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
            type: provider_metadata
          }
          carousel: carousel_media {
            id
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
    citiesDropdown: cities {
      id
      name
      slug
    }

    totalProducts: productsConnection {
      aggregate {
        totalCount
      }
    }
    totalDayTours: productsConnection(where: { type: "DAYTOUR" }) {
      aggregate {
        count
      }
    }
    totalMultiDay: productsConnection(where: { type: "MULTIDAY" }) {
      aggregate {
        count
      }
    }
    totalAirportPickup: productsConnection(where: { type: "AIRPORTPICKUP" }) {
      aggregate {
        count
      }
    }
  }
`;
interface FEATURED_EXPERIENCES_INTERFACE {
  homePage: {
    header: string;
    subheader: string;
    allThings: [
      {
        product: {
          id: string;
          name: string;
          slug: string;
          duration: string;
          price: string;
          cardMessage: string;
          cardSnippet: string;
          cardMedia: [CARDMEDIAINTERFACE];
          carousel: [CARDMEDIAINTERFACE];
          reviews: {
            id: string;
            rating: string;
          };
        };
      }
    ];
    dayTours: [
      {
        product: {
          id: string;
          name: string;
          slug: string;
          duration: string;
          price: string;
          cardMessage: string;
          cardSnippet: string;
          cardMedia: [CARDMEDIAINTERFACE];
          reviews: {
            id: string;
            rating: string;
          };
        };
      }
    ];
    multiday: [
      {
        product: {
          id: string;
          name: string;
          slug: string;
          duration: string;
          price: string;
          cardMessage: string;
          cardSnippet: string;
          cardMedia: [CARDMEDIAINTERFACE];
          reviews: {
            id: string;
            rating: string;
          };
        };
      }
    ];
    airportTransfers: [
      {
        product: {
          id: string;
          name: string;
          slug: string;
          duration: string;
          price: string;
          cardMessage: string;
          cardSnippet: string;
          cardMedia: [CARDMEDIAINTERFACE];
          reviews: {
            id: string;
            rating: string;
          };
        };
      }
    ];
  };
  citiesDropdown: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];

  totalProducts: {
    aggregate: {
      totalCount: number;
    };
  };
  totalDayTours: {
    aggregate: {
      count: number;
    };
  };
  totalMultiDay: {
    aggregate: {
      count: number;
    };
  };
  totalAirportPickup: {
    aggregate: {
      count: number;
    };
  };
}
export default FEATUREDEXPERIENCES;
export type { FEATURED_EXPERIENCES_INTERFACE };
