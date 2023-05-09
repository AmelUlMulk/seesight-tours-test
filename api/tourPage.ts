import { gql } from '@apollo/client';

const FETCH_PRODUCT = gql`
  query FETCH_PRODUCT($slug: JSON!, $Id: String!) {
    product: products(where: { slug: $slug }) {
      id: boat_id
      name
      slug
      metaDescription: meta_description
      canonical
      pageTitle: title
      type
      trustBar: trust_bar
      shortDescription: short_description
      longDescription: long_description
      cardMessage: card_message
      trustBar: trust_bar
      tourIncludes: tour_includes
      importantInfo: important_info
      duration
      price
      FAQ

      carousel: carousel_media {
        id
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
      cities {
        id
        name
        slug
      }
      attractions {
        id
        name
        slug
        cardSnippet: snippet
        cardMedia: card_media {
          id
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        cardMediaAlt: media_library {
          id
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        city {
          id
          name
          slug
        }
      }
      relatedProducts: related_products {
        id: boat_id
        name
        slug
        duration
        price
        cardSnippet: snippet
        cardMessage: card_message
        carousel: carousel_media {
          id
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        cardMedia: card_media {
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
      cardMedia: card_media {
        url
      }
      private
    }
    reviews(where: { product: { slug: $slug } }) {
      rating
      review
      traveller
      source
    }
    rezdy: boatnew_products(where: { slug: { _eq: $Id } }) {
      rezdy {
        rezdyId: rezdy_id
      }
    }
  }
`;
interface FETCH_PRODUCT_INTERFACE {
  product: [PRODUCTINTERFACE1];
  reviews: [
    {
      rating: number;
      review: string;
      travellor: string;
    }
  ];
  rezdy: [
    {
      rezdy: {
        rezdyId: string;
      };
    }
  ];
}
interface PRODUCTINTERFACE1 {
  id: string;
  name: string;
  slug: string;
  metaDescription: string;
  canonical: string;
  pageTitle: string;

  type: string;
  trustBar: string;
  shortDescription: string;
  longDescription: string;
  cardMessage: string;
  tourIncludes: [string];
  importantInfo: [string];
  duration: number;
  price: number;
  FAQ: [string];
  carousel: [CARDMEDIAINTERFACE];
  cities: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  attractions: [ATTRACTION_INTERFACE];
  relatedProducts: [PRODUCTINTERFACE];
  cardMedia: {
    url: string;
  };
  private: string;
  reviews: [
    {
      rating: number;
      review: string;
      travellor: string;
      source: string;
    }
  ];
}
interface CARDMEDIAINTERFACE {
  name: string;
  alt: string;
  url: string;
  fragment: string;
  type: string;
}
interface ATTRACTION_INTERFACE {
  id: string;
  name: string;
  slug: string;
  cardSnippet: string;
  cardMedia: [CARDMEDIAINTERFACE];
  cardMediaAlt: [CARDMEDIAINTERFACE];
  city: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
}
interface PRODUCTINTERFACE {
  id: string;
  name: string;
  slug: string;
  duration: string;
  price: string;
  cardMessage: string;
  cardSnippet: string;
  cardMedia: [CARDMEDIAINTERFACE];
  carousel: [CARDMEDIAINTERFACE];
  reviews: [
    {
      id: string;
      rating: number;
    }
  ];
}
export default FETCH_PRODUCT;
export type { FETCH_PRODUCT_INTERFACE, PRODUCTINTERFACE1 };
