<<<<<<< Updated upstream
import React from 'react';

const Blogs = () => {
  return <div>Blogs</div>;
=======
import React, { useState } from 'react';
import { BLOGS_PAGE, BLOG_PAGE_INTERFACE } from '../../api/blogsPage';
import PageHero from '../../components/Contact/PageHero';
import client from '../../utils/connections/AppoloClient';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import dayjs from 'dayjs';

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
    <div>
      <PageHero
        title={'Blogs'}
        snippet={'See what people have to say about us!'}
        media={
          '	https://res.cloudinary.com/see-sight-tours/image/upload/w_1440,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581435096/american-falls-luna-island-rainbow-bridge.webP'
        }
      />
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
                <div className="px-6 py-4 relative">
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="font-bold text-xl mb-2 px-5">
                      {blog.header}
                    </div>
                    <p className="text-gray-700 text-base px-5 text-justify py-2">
                      {blog.snippet}
                    </p>
                    <div className="font-bold absolute -top-10 bg-gray-900 bg-opacity-30 text-white right-0 px-10 py-2 ">
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
    </div>
  );
>>>>>>> Stashed changes
};

export default Blogs;
