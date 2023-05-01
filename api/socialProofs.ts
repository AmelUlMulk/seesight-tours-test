import { gql } from '@apollo/client';

export const RECENT_BOOKINGS = gql`
  query RECENT_BOOKINGS($pastDate: timestamptz, $tourSlug: String) {
    bookings: boatnew_booking_aggregate(
      where: {
        created_at: { _gte: $pastDate }
        product: { slug: { _eq: $tourSlug } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
export const CONFIRMED_BOOKING_BY_DATE = gql`
  query CONFIRMED_BOOKING_BY_DATE($pastDate: timestamptz, $today: timestamptz) {
    bookings: boatnew_booking(
      where: { created_at: { _gte: $pastDate, _lte: $today } }
      order_by: { created_at: desc }
    ) {
      customer {
        customerName: contact_name
      }
      product {
        citiesProducts: cities_products {
          city {
            name
          }
        }
      }
      createdAt: created_at
    }
  }
`;
export interface RECENTBOOKINGS {
  bookings: {
    aggregate: {
      count: number;
    };
  };
}
export interface RECENTCONFIRMEDBOOKINGS {
  bookings: [
    {
      customer: {
        customerName: string;
      };
      product: {
        citiesProducts: [
          {
            city: {
              name: string;
            };
          }
        ];
      };

      createdAt: Date;
    }
  ];
}
