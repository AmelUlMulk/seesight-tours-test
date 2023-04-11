import { gql } from '@apollo/client';

const CONTACT_PAGE = gql`
  query CONTACT_PAGE {
    contactPage {
      header
      subheader
      slug
      pageTitle: page_title
      metaDescription: meta_description
      canonical
      tollFree: toll_free
      local
      fax
      email
      address {
        ... on ComponentAddressAddress {
          title
          address1
          address2
          address3
        }
      }
    }
  }
`;
interface CONTACT_PAGE_INTERFACE {
  contactPage: {
    header: string;
    subheader: string;
    slug: string;
    pageTitle: string;
    metaDescription: string;
    canonical: string;
    tollFree: string;
    local: string;
    fax: string;
    email: string;
    address: {
      title: string;
      address1: string;
      address2: string;
      address3: string;
    };
  };
}
export { CONTACT_PAGE };
export type { CONTACT_PAGE_INTERFACE };
