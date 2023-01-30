import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const FRAGMENT_AVAILABILITIES_GROUP = gql`
  fragment FragmentAvailabilitiesGroup on boat_availabilities_group {
    id
    name
    city_id
    availabilities {
      id
      pax
      startDate: start_date
      endDate: end_date
      juggle
      exclusion
      resources {
        id
        type
        resources
        seats
      }
    }
  }
`;

const FRAGMENT_ATTRACTIONS = gql`
  fragment FragmentAttraction on boat_attractions {
    id
    name
    questions
  }
`;

const FRAGMENT_OPTIONS = gql`
  fragment FragmentOption on boat_options {
    id
    start_time: start_time
    availabilities_groups: availabilities_groups {
      ...FragmentAvailabilitiesGroup
    }
  }
`;
const FRAGMENT_PRODUCT = gql`
  fragment FragmentProduct on boat_products {
    id
    name
    productCode: reference
    active
    pickupBounds: pickup_bounds
    productType: product_type
    duration
    bookingCutoff: booking_cutoff
    cancelBefore: cancel_cutoff_before
    cancelAfter: cancel_cutoff_after
    price
    advertisedPrice: advertised_price
    quantity
    bookingInfo: booking_info
    customMsg: custom_msg
    options {
      ...FragmentOption
    }
    attractions: products_attractions {
      attraction {
        ...FragmentAttraction
      }
    }
    city {
      id
      name
      coordinates
      availabilitiesGroups: availabilities_groups {
        ...FragmentAvailabilitiesGroup
      }
      attractions {
        ...FragmentAttraction
      }
    }
  }
  ${FRAGMENT_OPTIONS}
  ${FRAGMENT_ATTRACTIONS}
  ${FRAGMENT_AVAILABILITIES_GROUP}
`;

const FRAGMENT_VEHICLE_CORE = gql`
  fragment FragmentVehicleCore on boat_vehicles {
    id
    name
    capacity
    city: office
  }
`;

const FRAGMENT_VEHICLE_REST = gql`
  fragment FragmentVehicleRest on boat_vehicles {
    makeModel: make_model
    plateNumber: plate_number
    vinNumber: vin_number
    insurance
    ownership
    year
    colour
    notes: maintenence
  }
`;

const FRAGMENT_MEDIA = gql`
  fragment FragmentMedia on card_media {
    name
    alt: alternativeText
    url
    fragment: caption
  }
`;

const FRAGMENT_PRODUCT_ORDER = gql`
  fragment FRAGMENT_PRODUCT_ORDER on Product {
    strapiID: id
    id: boat_id
    name
    slug
    price
    cardSnippet: snippet
    cardMessage: card_message
    cardMedia: card_media {
      id
      name
      alternativeText
      url
      caption
      fragment: caption
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
    duration
    slug
    cardSnippet: snippet
    cardMessage: card_message
    cardMedia: card_media {
      id
      name
      alternativeText
      url
      caption
      fragment: caption
    }
  }
`;
const FRAGMENT_PRODUCT_REVIEW = gql`
  fragment FRAGMENT_PRODUCT_REVIEW on Product {
    strapiID: id
    boatID: boat_id
    name
    slug
    price
    cardSnippet: snippet
    cardMessage: card_message
    cardMedia: card_media {
      id
      name
      alternativeText
      url
      caption
      fragment: caption
    }
    reviews {
      id
      rating
    }
    duration
    slug
    cardSnippet: snippet
    cardMessage: card_message
    cardMedia: card_media {
      id
      name
      alternativeText
      url
      caption
      fragment: caption
    }
  }
`;
interface FRAGMENT_PRODUCT_ORDER_INTERFACE {
  strapiID: string;
  id: string;
  name: string;
  slug: string;
  price: string;
  cardSnippet: string;
  cardMessage: string;
  cardMedia: [CARDMEDIAINTERFACE];
  reviews: [
    {
      id: string;
      rating: string;
    }
  ];
  duration: string;
}
export {
  FRAGMENT_AVAILABILITIES_GROUP,
  FRAGMENT_ATTRACTIONS,
  FRAGMENT_VEHICLE_CORE,
  FRAGMENT_VEHICLE_REST,
  FRAGMENT_PRODUCT,
  FRAGMENT_OPTIONS,
  FRAGMENT_MEDIA,
  FRAGMENT_PRODUCT_ORDER,
  FRAGMENT_PRODUCT_REVIEW
};
export type { FRAGMENT_PRODUCT_ORDER_INTERFACE };
