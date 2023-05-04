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
    width: ${props => (props.large ? '62%' : '30.6%')} !important;
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
      <h2 className="text-4xl font-semibold text-start">Trending</h2>
      {mediaQuery && (
        <Image
          src="/SearchBlogMenu.svg"
          width={40}
          height={40}
          alt="searchBlogIcons"
          onClick={() => setToggleSearch(!toggleSearch)}
          className="absolute top-0 right-0"
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
      <div className="md:flex md:gap-0 mt-10">
        <div className="flex-none md:w-[80%]">
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
                    className="h-[250px] md:h-[280px] lg:h-[320px] xl:h-[380px] md:w-full rounded-[3px]"
                  />
                  <div className="absolute top-[70%] left-[5%] text-white">
                    <p className="text-xs font-light">{blog.publicationDate}</p>
                    <h3 className="text-base font-medium mt-5">
                      {blog.header}
                    </h3>
                  </div>
                </StyleDiv>
              ))}
          </div>
        </div>
        <div>
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
