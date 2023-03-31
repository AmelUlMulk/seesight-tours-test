import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const REVIEWS_PAGE = gql`
  query REVIEWS_PAGE {
    reviewsPage {
      header: Header
      subheader: Subheader
      slug
      pageTitle: Page_title
      metaDescription: Meta_description
      canonical: Cannonical
      hero_media: Banner_media {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
    }
  }
`;
interface REVIEWS_PAGE_INTERFACE {
  reviewsPage: {
    header: string;
    subheader: string;
    slug: string;
    pageTitle: string;
    metaDescription: string;
    canonical: string;
    hero_media: [CARDMEDIAINTERFACE];
  };
}
export { REVIEWS_PAGE };
export type { REVIEWS_PAGE_INTERFACE };
