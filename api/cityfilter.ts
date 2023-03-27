import { gql } from '@apollo/client';
import {
  FRAGMENT_PRODUCT_ORDER,
  FRAGMENT_PRODUCT_ORDER_INTERFACE
} from './fragments';

const CITIES_FILTER = gql`
  query CITIES_FILTER($filter: JSON!) {
    cities(where: $filter) {
      name
      allThings: all_things_to_do {
        product {
          ...FRAGMENT_PRODUCT_ORDER
        }
      }
      dayTours: day_tours {
        product {
          ...FRAGMENT_PRODUCT_ORDER
        }
      }
      multiday: multi_day_tours {
        product {
          ...FRAGMENT_PRODUCT_ORDER
        }
      }
    }
    citiesList: cities {
      id
      name
      slug
    }
  }
  ${FRAGMENT_PRODUCT_ORDER}
`;
interface CITY_FILTER_INTERFACE {
  cities: [
    {
      name: string;
      allThings: {
        product: [FRAGMENT_PRODUCT_ORDER_INTERFACE];
      };
      dayTours: {
        product: [FRAGMENT_PRODUCT_ORDER_INTERFACE];
      };
      multiday: {
        product: [FRAGMENT_PRODUCT_ORDER_INTERFACE];
      };
      airportTransfers: {
        product: [FRAGMENT_PRODUCT_ORDER_INTERFACE];
      };
    }
  ];
  citiesList: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
}
export { CITIES_FILTER };
export type { CITY_FILTER_INTERFACE };
