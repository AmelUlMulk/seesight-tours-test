import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const FAQ_PAGE = gql`
  query FAQ_PAGE {
    faqPage {
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
      sectionHeader: first_section_header
      sectionSubheader: first_section_subheader
      sectionContent: first_section_content
    }
  }
`;
const FAQ_CONTENT = gql`
  query FAQ_PAGE {
    faqPage {
      sectionHeader: first_section_header
      sectionSubheader: first_section_subheader
      sectionContent: first_section_content
    }
  }
`;
interface FAQ_PAGE_INTERFACE {
  faqPage: {
    header: string;
    subheader: string;
    slug: string;
    pageTitle: string;
    metaDescription: string;
    canonical: string;
    heroMedia: [CARDMEDIAINTERFACE];
    sectionHeader: string;
    sectionSubheader: string;
    sectionContent: [string];
  };
}
export { FAQ_PAGE, FAQ_CONTENT };
export type { FAQ_PAGE_INTERFACE };
