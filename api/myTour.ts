import { gql } from '@apollo/client';

const BOOKING_SEARCH = gql`
  query BOOKING_SEARCH($slug: String) {
    booking: boatnew_booking(where: { id: { _eq: $slug } }) {
      id
      confirmed
      status
      source
      pickupLocation: pickup_location
      pickupTime: pickup_time
      tourDate: tour_date
      tourTime: tour_time
      notes: notes_customer
      customer {
        name: contact_name
        email
        secondaryEmail: secondary_email
        phone
        secondaryPhone: secondary_phone
      }
      product {
        id
        name
        slug
        type
        pickupBounds: pickup_bounds
        duration
        pickupRequired: pickup_required
        cancelCutOff: cancel_cutoff
        city: cities_products {
          city {
            coordinates
          }
        }
      }
      transactions(order_by: { created_at: asc }) {
        stripeId: stripe_id
        date
        type
        value
        card_type
        cardValue: card_value
        items
      }
      passengers: booking_units {
        quantity
        unit {
          id
          label
        }
        price
      }
      REZDY: rezdy {
        id
      }
    }
    productDetails(where: { slug: { _eq: $slug } }) {
      card_media(limit: 1) {
        url
      }
    }
  }
`;

interface MY_TOURS_PAGE_INTERFACE {
  booking: [
    {
      id: string;
      confirmed: string;
      status: string;
      source: string;
      pickupLocation: string;
      pickupTime: string;
      tourDate: string;
      tourTime: string;
      notes: string;
      customer: {
        name: string;
        email: string;
        secondaryEmail: string;
        phone: string;
        secondaryPhone: string;
      };
      product: {
        id: string;
        slug: string;
        name: string;
        type: string;
        pickupBounds: [
          {
            lat: number;
            lng: number;
          }
        ];
        duration: number;
        pickupRequired: boolean;
        cancelCutOff: string;
        city: [
          {
            city: {
              coordinates: {
                lat: number;
                lng: number;
              };
            };
          }
        ];
      };
      transactions: {
        stripeId: string;
        date: string;
        type: string;
        value: string;
        card_type: string;
        cardValue: string;
      };
      passengers: [
        {
          quantity: number;
          unit: {
            id: string;
            label: string;
          };
          price: string;
        }
      ];
      REZDY: [
        {
          id: string;
        }
      ];
    }
  ];
  productDetails: [
    {
      card_media: [
        {
          url: string;
        }
      ];
    }
  ];
}
interface BOOKING_INTERFACE {
  id: string;
  confirmed: string;
  status: string;
  source: string;
  pickupLocation: string;
  pickupTime: string;
  tourDate: string;
  tourTime: string;
  notes: string;
  customer: {
    name: string;
    email: string;
    secondaryEmail: string;
    phone: string;
    secondaryPhone: string;
  };
  product: {
    id: string;
    name: string;
    type: string;
    slug: string;
    pickupBounds: [
      {
        lat: number;
        lng: number;
      }
    ];
    duration: number;
    pickupRequired: boolean;
    cancelCutOff: string;
    city: [
      {
        city: {
          coordinates: {
            lat: number;
            lng: number;
          };
        };
      }
    ];
  };
  transactions: {
    stripeId: string;
    date: string;
    type: string;
    value: string;
    card_type: string;
    cardValue: string;
  };
  passengers: [
    {
      quantity: number;
      unit: {
        id: string;
        label: string;
      };
      price: string;
    }
  ];
  REZDY: [
    {
      id: string;
    }
  ];
  notFound: boolean;
  productDetails: [
    {
      card_media: [
        {
          url: string;
        }
      ];
    }
  ];
}
export default BOOKING_SEARCH;
export type { MY_TOURS_PAGE_INTERFACE, BOOKING_INTERFACE };
