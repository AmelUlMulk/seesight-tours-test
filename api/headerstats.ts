import { gql } from '@apollo/client';

const HEADER_STATS = {
  query: gql`
    query HEADER_STATS {
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

interface HEADER_STATS_INTERFACE {
  boatnew_booking_aggregate: {
    aggregate: {
      count: number;
    };
  };
  boatnew_customers_aggregate: {
    aggregate: {
      count: number;
    };
  };
  strapi_reviews: [
    {
      rating: number;
    }
  ];
}

export { HEADER_STATS };
export type { HEADER_STATS_INTERFACE };
