import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const PRIVACY_PAGE = {
  query: gql`
    query PRIVACY_PAGE {
      privacyPage {
        id
        pageTitle: Page_title
        metaDescription: Meta_description
        slug: Slug
        canonical: Canonical
        content: Content
        header: Header
        subheader: Subheader
        heroMedia: Banner_media {
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
      }
    }
  `
};
interface PRIVACY_PAGE_INTERFACE {
  privacyPage: {
    id: string;
    pageTitle: string;
    metaDescription: string;
    slug: string;
    canonical: string;
    content: string;
    header: string;
    subheader: string;
    heroMedia: [CARDMEDIAINTERFACE];
  };
}
export { PRIVACY_PAGE };
export type { PRIVACY_PAGE_INTERFACE };
