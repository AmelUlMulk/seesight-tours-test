import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { RefObject, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from '../../hooks/mediaQuery';

interface IProps {
  filterBlogs: Array<Record<string, unknown>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  blogsRef: RefObject<HTMLDivElement>;
}
const BlogCards = styled.div`
  max-height: 600px;
  min-height: 500px;
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
const BlogSnippet = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DisplayBlogs = ({
  filterBlogs,
  currentPage,
  setCurrentPage,
  blogsRef
}: IProps) => {
  const [page, setPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  const startIndex = (page - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filterBlogs.slice(startIndex, endIndex);

  const pageCounter = Math.ceil(filterBlogs?.length / 8);
  const mediaQuery = useMediaQuery(640);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
    blogsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  console.log('filterBlogs:', filterBlogs);
  return (
    <>
      <div className=" flex justify-center ">
        <div className="grid w-5/6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filterBlogs &&
            filterBlogs
              ?.slice(currentPage, currentPage + 8)
              .map((blog: Record<string, any>) => (
                <div
                  key={blog.slug}
                  className="p-2 bg-white rounded-md shadow-lg "
                >
                  <BlogCards className="h-full  w-full rounded-lg overflow-hidden ">
                    <StyledImage
                      src={blog.heroMedia[0].url}
                      alt={blog.heroMedia[0].url}
                      width={500}
                      height={200}
                    />
                    <div className="px-6 py-4 relative">
                      <Link href={`/blog/${blog.slug}`}>
                        <div className="font-bold text-base lg:text-xl mb-2 px-2 2xl:px-5">
                          {blog.header}
                        </div>
                        <BlogSnippet className="text-gray-700 text-base px-2 2xl:px-5 text-justify py-2">
                          {blog.snippet}
                        </BlogSnippet>
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
            forcePage={currentPage}
            onPageChange={handlePageClick}
            activeClassName="bg-slate-200"
            pageRangeDisplayed={mediaQuery ? 3 : 5}
            pageCount={pageCounter}
            previousLabel="<"
            containerClassName="flex justify-end xsm:gap-1 sm:gap-3 mt-10"
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
