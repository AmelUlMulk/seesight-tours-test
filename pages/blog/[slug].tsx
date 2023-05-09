import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { BLOG_PAGE, BLOG_PAGE_INTERFACE } from '../../api/blogPage';
import client from '../../apollo-client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import BlogHero from '../../components/BlogHero/BlogHero';
import { useRouter } from 'next/router';
import { BLOGS_PAGE } from '../../api/blogsPage';
interface Params {
  params: {
    slug: string;
  };
}

interface BLOGS {
  blogs: [
    {
      slug: string;
    }
  ];
}
const BLOGPAGE = styled.div`
  margin-top: 2rem;
  display: flex;
  position: relative;
  min-height: 100vh;
  width: 100;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 30px;
    padding-bottom: 10px;
    font-weight: 500;
  }
  p {
    font-size: 20px;
    text-align: justify;
    img {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .author-section {
    width: 100%;
    min-height: 15vh;
    padding: 2rem;
    display: flex;
    gap: 1rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    @media (max-width: 1000px) {
      flex-direction: column;
      gap: 1px;
    }
    img {
      padding-top: 25px;
      height: 50%;
      border-radius: 100%;
    }
    .author-description {
      align-items: center;
      gap: 5rem;
      width: 90%;
      position: relative;
      h3 {
        font-weight: 500;
        color: rgb(57, 216, 221);
        letter-spacing: 1px;
        font-size: 30px;
        @media (max-width: 500px) {
          letter-spacing: 0px;
        }
      }
      p {
        color: rgb(130, 145, 146);
        font-size: 20px;
      }
    }
  }
  .cta-two-tone {
    background-image: url('https://res.cloudinary.com/see-sight-tours/image/upload/v1669883122/dark-back_tqnwfs.png');
    width: 70%;
    @media (max-width: 1200px) {
      width: 100%;
    }
    min-height: 250px;
    border-radius: 20px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin-top: 1rem;
      color: white;
      font-size: 29px;
      padding: 0rem 1rem;
      text-align: center;
      min-height: 50%;
      position: relative;
      @media (max-width: 900px) {
        text-align: center;
      }
      @media (max-width: 500px) {
        text-align: center;
        height: 80%;
        font-size: 26px;
        margin-bottom: 2rem;
      }
    }
    .button-container {
      padding-top: 15px;
      width: 100%;
      display: flex;
      background-position: center;
      justify-content: center;
      position: relative;
      height: 65px;
      border-radius: 0px 0px 20px 20px;
      @media (max-width: 500px) {
        height: 20%;
      }
      a {
        position: absolute;
        background: #fd5d5a;
        border-radius: 20px;
        width: 45%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white !important;
        font-size: 21px;
        font-weight: bold;
        @media (max-width: 500px) {
          width: 60%;
          height: 60%;
          font-size: 20px;
        }
        &:hover {
          background: #fd3f3c;
        }
      }
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query<BLOGS>({
    query: gql`
      query BLOGS_PAGE {
        blogs(sort: "publication_date") {
          slug
        }
      }
    `
  });

  return {
    paths: data.blogs.map(blog => {
      return { params: { slug: blog.slug.toString() } };
    }),
    fallback: true
  };
}
export async function getStaticProps({ params }: Params) {
  const { slug } = params;

  const { data: blogsData } = await client.query<BLOG_PAGE_INTERFACE>(
    BLOGS_PAGE
  );

  const { data } = await client.query<BLOG_PAGE_INTERFACE>({
    query: BLOG_PAGE,
    variables: {
      slug
    }
  });

  return {
    props: {
      blogs: data.blogs,
      blogsPage: blogsData?.blogsPage
    }
  };
}

const Blog = ({ blogsPage, blogs }: BLOG_PAGE_INTERFACE) => {
  const router = useRouter();
  if (!blogs) {
    return <h2>Content not available</h2>;
  }
  const filteredContent = blogs[0].content
    ?.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    ?.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    ?.replace(/^# (.*$)/gim, '<h2>$1</h2>')
    ?.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    ?.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    ?.replace(/\*(.*)\*/gim, '<i>$1</i>')
    ?.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    ?.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    ?.replace(/\n$/gim, '<br />')
    ?.trim();
  return (

    <>
      <Head>
        <title>{blogsPage?.pageTitle ? blogsPage?.pageTitle : ''}</title>
        <meta
          property="og:description"
          content={blogsPage?.metaDescription}
          key="metadescription"
        />
        <link
          href={`${blogsPage?.canonical}/${router.query.slug}`}
          rel="canonical"
          key="canonical"
        />
      </Head>
      <div>
        <BlogHero
          title={blogs[0].pageTitle}
          snippet={blogs[0].subheader}
          media={blogs[0].heroMedia[0].url}
          publicationDate={blogs[0].publicationDate}
          author={blogs[0].author}
        />
        <BLOGPAGE>
          <div className="w-4/6 flex-col shadow-lg shadow-gray-700 px-10 py-10 ">
            <h2>{blogs[0].pageTitle}</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {filteredContent}
            </ReactMarkdown>
          </div>
        </BLOGPAGE>
      </div>
    </>
  );
};

export default Blog;
