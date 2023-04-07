import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import { SetStateAction } from 'react';
import { useMediaQuery } from '../../layouts/NavBar';
import ReviewCard from './ReviewCard';
interface IProps {
  totalReviews: Record<string, any>;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  fetchReviewsLoading: any;
}
const DisplayReviews = ({
  totalReviews,
  currentPage,
  setCurrentPage,
  fetchReviewsLoading
}: IProps) => {
  const { reviews } = totalReviews;
  const { reviewsConnection } = totalReviews;
  const mediaQuery = useMediaQuery(640);
  const pageCounter = Math.ceil(
    reviewsConnection ? reviewsConnection?.aggregate?.count / 10 : 0
  );
  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <section id="reviews-display" className="mt-5 px-5 xsm:px-8 sm:px-16">
      {fetchReviewsLoading && <div>Loading.....</div>}
      {reviews?.length === 0 && (
        <div className="text-[24px] text-[#333333] font-[600] px-5 xsm:px-8 sm:px-16">
          No reviews Found
        </div>
      )}
      {reviews &&
        reviews.map((review: any) => (
          <ReviewCard review={review} key={review?.id} />
        ))}
      <section id="pagination">
        <div className="  md:w-[65%] lg:w-[50%] xl:w-[40%] mx-auto md:ml-auto">
          <ReactPaginate
            breakLabel={<span className="sm:mr-3">...</span>}
            nextLabel=">"
            onPageChange={handlePageClick}
            activeClassName="bg-orange-300"
            pageRangeDisplayed={mediaQuery ? 3 : 5}
            pageCount={pageCounter}
            previousLabel="<"
            containerClassName="flex justify-center xsm:gap-1 sm:gap-3 mt-5"
            pageClassName="block  hover:bg-slate-400 rounded-[2px] px-2"
            // @ts-ignore
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
    </section>
  );
};

export default DisplayReviews;
