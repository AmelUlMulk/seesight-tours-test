import { gql } from '@apollo/client';
import { CARDMEDIAINTERFACE } from './commonInterfaces';

const BLOG_PAGE = gql`
  query BLOG_PAGE($slug: JSON!) {
    blogs(where: { slug: $slug }) {
      header
      subheader
      name
      slug
      pageTitle: page_title
      metaDescription: meta_description
      canonical
      snippet
      content
      author
      publicationDate: publication_date
      heroMedia: hero_media {
        name
        alt: alternativeText
        url
        fragment: caption
        type: provider_metadata
      }
      relatedArticles: related_articles(sort: "publication_date:desc") {
        slug
        header
        snippet
        publicationDate: publication_date
        heroMedia: hero_media {
          name
          alt: alternativeText
          url
          fragment: caption
          type: provider_metadata
        }
      }
      relatedProducts: related_products {
        id
        name
        duration
        slug
        price
        cardMessage: card_message
        cardSnippet: snippet
        cardMedia: card_media {
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
        slug
      }
    }
  }
`;
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
  blogs: [
    {
      header: string;
      name: string;
      subheader: string;
      slug: string;
      pageTitle: string;
      metaDescription: string;
      canonical: string;
      snippet: string;
      content: string;
      author: string;
      publicationDate: string;
      heroMedia: [CARDMEDIAINTERFACE];
      relatedArticles: [
        {
          slug: string;
          header: string;
          snippet: string;
          publicationDate: string;
          heroMedia: [CARDMEDIAINTERFACE];
        }
      ];
      relatedProducts: [
        {
          id: string;
          name: string;
          duration: string;
          slug: string;
          price: string;
          cardMessage: string;
          cardSnippet: string;
          cardMedia: [CARDMEDIAINTERFACE];
          reviews: [
            {
              id: string;
              rating: string;
            }
          ];
        }
      ];
    }
  ];
}

export { BLOG_PAGE };
export type { BLOG_PAGE_INTERFACE };
