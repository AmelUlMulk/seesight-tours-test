import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { BLOGS_PAGE, BLOG_PAGE_INTERFACE } from '../../api/blogsPage';
import PageHero from '../../layouts/PageHero';
import client from '../../apollo-client';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import dayjs from 'dayjs';
import BlogsHeader from '../../components/Blogs/Header';
import TrendingBlogs from '../../components/Blogs/Trendings';
import DisplayBlogs from '../../components/Blogs/DisplayBlogs';

export async function getStaticProps() {
  const { data } = await client.query<BLOG_PAGE_INTERFACE>(BLOGS_PAGE);
  return {
    props: {
      blogsPage: data.blogsPage,
      blogs: data.blogs,
      blogCategories: data.blogCategories
    }
  };
}

const BlogCards = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
  max-height: 600px;
`;
const StyledImage = styled(Image)`
  z-index: 0;
  height: 250px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
`;
const Blogs = ({ blogsPage, blogs, blogCategories }: BLOG_PAGE_INTERFACE) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterBlogs, setFilterBlogs] =
    useState<Array<Record<string, unknown>>>(blogs);
  const blogsRef = useRef<HTMLDivElement>(null);
  console.log('blogs', blogs);
  // console.log('blogs', blogsPage);
  // console.log('blogs', blogCategories);
  return (
    <>
      <Head>
        <title>{blogsPage?.pageTitle ? blogsPage?.pageTitle : ''}</title>
        <meta
          property="og:description"
          content={blogsPage?.metaDescription}
          key="metadescription"
        />
        <link href={blogsPage?.canonical} rel="canonical" key="canonical" />
      </Head>
      <div>
        <PageHero
          title={'Blogs'}
          snippet={'See what people have to say about us!'}
          media={
            '	https://res.cloudinary.com/see-sight-tours/image/upload/w_1440,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581435096/american-falls-luna-island-rainbow-bridge.webP'
          }
          video={false}
        />
        <BlogsHeader blogs={blogs} />
        <TrendingBlogs
          blogs={blogs}
          blogsCategories={blogCategories}
          filterBlogs={filterBlogs}
          setFilterBlog={setFilterBlogs}
          setCurrentPage={setCurrentPage}
          blogsRef={blogsRef}
        />
        <h2
          ref={blogsRef}
          className="w-5/6 mx-auto mt-10 text-4xl font-semibold text-start"
        >
          ALL BLOGS
        </h2>
        <DisplayBlogs
          filterBlogs={filterBlogs}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Blogs;
