import React, { useState } from 'react';
import { BLOGS_PAGE, BLOG_PAGE_INTERFACE } from '../../api/blogsPage';
import Image from 'next/image';
import client from '../../apollo-client';

import styled from 'styled-components';
import Link from 'next/link';
import dayjs from 'dayjs';
import BlogHero from '../../components/Blogs/BlogHero';

export async function getStaticProps() {
  const { data } = await client.query<BLOG_PAGE_INTERFACE>(BLOGS_PAGE);
  return {
    props: {
      blogsPage: data.blogsPage,
      blogs: data.blogs
    }
  };
}

const BlogCards = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
  max-height: 600px;
`;

const TRENDINGBLOG = styled.div`
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    content: '';
    z-index: 1;
  }

  position: relative;
`;

const StyledImage = styled(Image)`
  z-index: 0;
  height: 300px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
`;

const Blogs = ({ blogsPage, blogs }: BLOG_PAGE_INTERFACE) => {
  const [blogCount, setBlogCount] = useState(6);
  return (
    <>
      <BlogHero mainBlogs={blogs} />
      <section className="px-[10%] w-full">
        <h2 className="text-3xl font-semibold">Latest</h2>
        <div className="grid grid-cols-6 w-full">
          <div className="flex  col-span-5    ">
            <div className="w-2/3 flex flex-col ">
              <TRENDINGBLOG>
                <Image
                  src="https://res.cloudinary.com/see-sight-tours/image/upload/v1678358072/strapi/Journey_Behind_the_Falls_Vs_Maid_of_the_Mist_06548011c1.webP"
                  alt="sometthig"
                  width={700}
                  height={500}
                  quality={100}
                  className="w-full max-h-[350px] blog-image"
                />
                <div className=" absolute top-0 z-10  justify-center  w-full h-full flex items-end pb-[8%] ">
                  <div className="flex flex-col w-full px-[10%] gap-3 ">
                    <span className="text-white">Date</span>
                    <span className="text-white">Some Author</span>
                  </div>
                </div>
                <button className="absolute top-4 right-4 bg-black  ">
                  Category
                </button>
              </TRENDINGBLOG>
            </div>
          </div>
          <div className="grid-col-2"></div>
        </div>
      </section>

      <div className=" flex justify-center ">
        <div className="grid w-5/6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
          {blogs.slice(0, blogCount).map(blog => (
            <div key={blog.slug} className="flex justify-center w-full">
              <BlogCards className=" max-w-sm w-full rounded-lg overflow-hidden shadow-lg ">
                <StyledImage
                  src={blog.heroMedia[0].url}
                  alt={blog.heroMedia[0].url}
                  width={500}
                  height={200}
                />
                <div className=" relative">
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="font-bold text-xl ">{blog.header}</div>
                    <p className="text-gray-700 text-base px-5 text-justify py-2">
                      {blog.snippet}
                    </p>
                    <div className="font-bold absolute -top-10 bg-gray-900 bg-opacity-30 text-white right-0  ">
                      {blog?.publicationDate &&
                        dayjs(blog.publicationDate).format('MMM D, YYYY')}
                    </div>
                  </Link>
                </div>
              </BlogCards>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className=" px-36 text-center bg-red-700 border-none rounded-lg text-zinc-100 cursor-pointer font-bold h-14 "
          onClick={() => {
            blogCount === 6 ? setBlogCount(blogs.length) : setBlogCount(6);
          }}
        >
          {blogCount === 6 ? `SHOW MORE (${blogs.length})` : 'SHOW LESS'}
        </button>
      </div>
    </>
  );
};

export default Blogs;
