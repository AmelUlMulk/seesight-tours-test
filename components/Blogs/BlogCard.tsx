import Link from 'next/link';
import React from 'react';
import { CARDMEDIAINTERFACE } from '../../api/commonInterfaces';
import Image from 'next/image';
import dayjs from 'dayjs';
interface BLOG {
  blog: {
    header: string;
    slug: string;
    snippet: string;
    author: string;
    publicationDate: string;
    heroMedia: [CARDMEDIAINTERFACE];
    blogCategories: {
      id: string;
      title: string;
      slug: string;
    };
  };
}
const BlogCard = ({ blog }: BLOG) => {
  return (
    <div className="max-w-[95%] max-h-[320px] min-h-[500px] pl-3   ">
      <Image
        width={500}
        height={500}
        quality={100}
        alt={blog.heroMedia[0].alt}
        src={blog.heroMedia[0].url}
        className="min-h-[250px] max-h-[250px] "
      />

      <Link href={`/blog/${blog.slug}`}>
        <div className="px-[4%]">
          <p className=" text-sm  text-gray-500 right-0  ">
            {blog?.publicationDate &&
              dayjs(blog.publicationDate).format('MMM D, YYYY')}
          </p>
          <div className="font-bold ">{blog.header}</div>
          <p className=" text-sm  text-gray-500 right-0  ">{blog.author}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
