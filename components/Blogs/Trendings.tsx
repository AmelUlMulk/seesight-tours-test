import Image from 'next/image';
import styled from 'styled-components';
import BlogSearch from './BlogSearch';
import { SetStateAction } from 'react';

interface IProps {
  blogs: any;
  blogsCategories: any;
  filterBlogs: Array<Record<string, unknown>>;
  setFilterBlog: React.Dispatch<SetStateAction<Array<Record<string, unknown>>>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}
interface CardProps {
  large: boolean;
}
const StyleDiv = styled.div<CardProps>`
  width: ${props => (props.large ? '62%' : '30.6%')} !important;
`;
const TrendingBlogs = ({
  blogs,
  blogsCategories,
  filterBlogs,
  setFilterBlog,
  setCurrentPage
}: IProps) => {
  return (
    <div id="trending" className="w-5/6 mx-auto">
      <h2 className="text-4xl font-semibold text-start">Trending</h2>
      <div className="flex mt-10">
        <div className="flex-none w-[80%]">
          <div className="flex flex-wrap gap-3">
            {blogs
              .slice(9, 14)
              .map((blog: Record<string, any>, index: number) => (
                <StyleDiv key={index} large={index === 0}>
                  <Image
                    src={blog?.heroMedia[0].url}
                    width={500}
                    height={400}
                    quality={100}
                    alt={blog?.heroMedia[0].url}
                    className="h-[380px] w-full"
                  />
                </StyleDiv>
              ))}
          </div>
        </div>
        <div>
          <BlogSearch
            blogs={blogs}
            blogsCategories={blogsCategories}
            setFilterBlog={setFilterBlog}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingBlogs;
