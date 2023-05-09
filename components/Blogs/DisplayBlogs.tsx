import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from '../../hooks/mediaQuery';

interface IProps {
  filterBlogs: Array<Record<string, unknown>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
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
const DisplayBlogs = ({ filterBlogs, currentPage, setCurrentPage }: IProps) => {
  const [page, setPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  const startIndex = (page - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filterBlogs.slice(startIndex, endIndex);

  const pageCounter = 6;
  const mediaQuery = useMediaQuery(640);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className=" flex justify-center ">
        <div className="grid w-5/6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {filterBlogs &&
            filterBlogs
              ?.slice(currentPage, currentPage + 8)
              .map((blog: Record<string, any>) => (
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

      <section id="pagination" className=" w-5/6 mx-auto">
        <div className="  md:w-[65%] lg:w-[50%] xl:w-[40%] md:ml-auto">
          <ReactPaginate
            breakLabel={<span className="sm:mr-3">...</span>}
            nextLabel=">"
            onPageChange={handlePageClick}
            activeClassName="bg-slate-200"
            pageRangeDisplayed={mediaQuery ? 3 : 5}
            pageCount={pageCounter}
            previousLabel="<"
            containerClassName="flex justify-end xsm:gap-1 sm:gap-3 mt-5"
            pageClassName="block  hover:bg-slate-400 rounded-[2px] px-2"
            // @ts-ignore
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
    </>
  );
};

export default DisplayBlogs;
