import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const DAYTOURS_PAGE = gql`
  query DAYTOURS_PAGE {
    dayTour {
      header
      subheader
      slug
      pageTitle: page_title
      metaDescription: meta_description
      canonical
      heroMedia: banner_media {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
    }
  }
`;
interface DAYTOURS_PAGE_INTERFACE {
  dayTour: DAY_TOUR_INTERFACE;
}
interface DAY_TOUR_INTERFACE {
  header: string;
  subheader: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  canonical: any;
}
export { DAYTOURS_PAGE };
export type { DAYTOURS_PAGE_INTERFACE, DAY_TOUR_INTERFACE };
