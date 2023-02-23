import { gql } from '@apollo/client';
import { FRAGMENT_PRODUCT_REVIEW } from './fragments';

const FRAGMENT_REVIEW = gql`
  fragment FragmentReview on Review {
    id
    title
    review
    traveller
    rating
    date
    source
    published_at
    cities {
      id
      name
      slug
    }
  }
`;

const FRAGMENT_REVIEW_AGGREGATE = gql`
  fragment FragmentReviewAggregate on ReviewConnection {
    aggregate {
      count
      totalCount
      avg {
        rating
      }
    }
    groupBy {
      rating {
        key
        connection {
          aggregate {
            count
            totalCount
          }
        }
      }
    }
  }
`;

const INSERT_REVIEW = gql`
  mutation INSERT_REVIEW($data: ReviewInput) {
    createReview(input: { data: $data }) {
      review {
        ...FragmentReview
      }
    }
  }
  ${FRAGMENT_REVIEW}
`;

const FETCH_REVIEWS = gql`
  query FETCH_REVIEWS($object: JSON, $limit: Int, $start: Int, $sort: String) {
    reviews(limit: $limit, start: $start, where: $object, sort: $sort) {
      ...FragmentReview
    }
    reviewsConnection(where: $object) {
      ...FragmentReviewAggregate
    }
  }
  ${FRAGMENT_REVIEW}
  ${FRAGMENT_REVIEW_AGGREGATE}
`;

const CITIES_PRODUCT_FILTER = gql`
  query CITIES_FILTER($filter: JSON!) {
    cities(where: $filter) {
      name
      allThings: all_things_to_do {
        product {
          ...FRAGMENT_PRODUCT_REVIEW
        }
      }
      dayTours: day_tours {
        product {
          ...FRAGMENT_PRODUCT_REVIEW
        }
      }
      multiday: multi_day_tours {
        product {
          ...FRAGMENT_PRODUCT_REVIEW
        }
      }
    }
  }
  ${FRAGMENT_PRODUCT_REVIEW}
`;

const CITIES_DROPDOWN = gql`
  query CITIES_PAGE {
    citiesPage {
      featured: featured_cities {
        city {
          id
          name
          slug
        }
      }
      cities: all_cities {
        city {
          id
          name
          slug
        }
      }
    }
  }
`;

const FETCH_PRODUCTS = gql`
  query FETCH_PRODUCTS {
    products {
      id
      name
      slug
    }
    cities {
      id
      name
      slug
    }
  }
`;
interface FETCH_PRODUCTS_INTERFACE {
  products: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  cities: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
}
interface FETCH_REVIEWS_INTERFACE {
  reviews: [
    {
      id: string;
      title: string;
      review: string;
      traveller: string;
      rating: number;
      date: string;
      source: string;
      product: [
        {
          id: string;
          name: string;
          slug: string;
        }
      ];
      cities: [
        {
          id: string;
          name: string;
          slug: string;
        }
      ];
    }
  ];
  reviewsConnection: {
    aggregate: {
      count: number;
      totalCount: number;
      avg: {
        rating: number;
      };
    };
    groupBy: {
      rating: [
        {
          key: number;
          connection: {
            aggregate: {
              count: number;
              totalCount: number;
            };
          };
        }
      ];
    };
  };
}
interface CITIES_DROPDOWN_INTERFACE {
  citiesPage: {
    featured: [
      {
        city: {
          id: string;
          name: string;
          slug: string;
        };
      }
    ];
    cities: [
      {
        city: {
          id: string;
          name: string;
          slug: string;
        };
      }
    ];
  };
}
export {
  FETCH_REVIEWS,
  FETCH_PRODUCTS,
  INSERT_REVIEW,
  FRAGMENT_REVIEW,
  CITIES_PRODUCT_FILTER,
  CITIES_DROPDOWN
};
export type {
  FETCH_REVIEWS_INTERFACE,
  FETCH_PRODUCTS_INTERFACE,
  CITIES_DROPDOWN_INTERFACE
};
