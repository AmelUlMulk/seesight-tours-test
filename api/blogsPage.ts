import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const BLOGS_PAGE = {
  query: gql`
    query BLOGS_PAGE {
      blogsPage {
        header
        subheader
        pageTitle: page_title
        slug
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
      blogCategories {
        id
        title
        slug
      }
      blogs(sort: "published_at:desc") {
        header
        slug
        snippet
        publicationDate: publication_date
        heroMedia: hero_media {
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
        blogCategories: blog_categories {
          id
          title
          slug
        }
      }
    }
  `
};

interface BLOG_PAGE_INTERFACE {
  blogsPage: {
    header: string;
    subheader: string;
    pageTitle: string;
    slug: string;
    metaDescription: string;
    canonical: string;
    heroMedia: [CARDMEDIAINTERFACE];
  };

  blogCategories: [
    {
      id: string;
      title: string;
      slug: string;
    }
  ];
  blogs: [
    {
      header: string;
      slug: string;
      snippet: string;
      publicationDate: string;
      heroMedia: [CARDMEDIAINTERFACE];
      blogCategories: {
        id: string;
        title: string;
        slug: string;
      };
    }
  ];
}

export { BLOGS_PAGE };
export type { BLOG_PAGE_INTERFACE };
