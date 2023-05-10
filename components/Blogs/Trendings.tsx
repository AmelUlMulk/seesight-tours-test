import Image from 'next/image';
import styled from 'styled-components';
import BlogSearch from './BlogSearch';
import { RefObject, SetStateAction, useState } from 'react';
import { useMediaQuery } from '../../hooks/mediaQuery';

interface IProps {
  blogs: any;
  blogsCategories: any;
  filterBlogs: Array<Record<string, unknown>>;
  setFilterBlog: React.Dispatch<SetStateAction<Array<Record<string, unknown>>>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  blogsRef: RefObject<HTMLDivElement>;
}
interface CardProps {
  large: boolean;
}
const StyleDiv = styled.div<CardProps>`
  @media (min-width: 768px) {
    width: ${props => (props.large ? '62.5%' : '30.6%')} !important;
  }
`;
const TrendingBlogs = ({
  blogs,
  blogsCategories,
  filterBlogs,
  setFilterBlog,
  setCurrentPage,
  blogsRef
}: IProps) => {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const mediaQuery = useMediaQuery(768);
  return (
    <div id="trending" className="w-5/6 mx-auto relative mt-16">
      <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold text-start">
        Trending
      </h2>
      {mediaQuery && (
        <Image
          src="/SearchBlogMenu.svg"
          width={25}
          height={25}
          alt="searchBlogIcons"
          onClick={() => setToggleSearch(!toggleSearch)}
          className="absolute top-0 right-0 "
        />
      )}
      {toggleSearch && (
        <div className="absolute top-14 right-0 z-50 bg-[#F9F9F9]">
          <BlogSearch
            blogs={blogs}
            blogsCategories={blogsCategories}
            setFilterBlog={setFilterBlog}
            setCurrentPage={setCurrentPage}
            blogsRef={blogsRef}
          />
        </div>
      )}
      <div className="flex justify-between md:justify-start md:gap-0 mt-10">
        <div className="flex-none w-full  md:w-[75%] lg:w-[80%]">
          <div className="flex flex-wrap flex-col md:flex-row gap-3">
            {blogs
              .slice(9, mediaQuery ? 12 : 14)
              .map((blog: Record<string, any>, index: number) => (
                <StyleDiv key={index} large={index === 0} className="relative">
                  <Image
                    src={blog?.heroMedia[0].url}
                    width={500}
                    height={400}
                    quality={100}
                    alt={blog?.heroMedia[0].url}
                    className="md:min-h-[230px] md:h-[100%] md:w-full rounded-[3px]"
                  />
                  <div className="absolute bottom-[10%] left-[5%] text-white">
                    <p className="text-xs font-light">{blog.publicationDate}</p>
                    <h3 className="text-sm lg:text-base font-medium mt-2">
                      {blog.header}
                    </h3>
                  </div>
                </StyleDiv>
              ))}
          </div>
        </div>
        <div className="md:w-[25%] lg:w-[20%]">
          {!mediaQuery && (
            <BlogSearch
              blogs={blogs}
              blogsCategories={blogsCategories}
              setFilterBlog={setFilterBlog}
              setCurrentPage={setCurrentPage}
              blogsRef={blogsRef}
            />
          )}

          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default TrendingBlogs;
