import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';

import Image from 'next/image';
import { SetStateAction } from 'react';
interface IProps {
  totalReviews: Record<string, any>;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}
const DisplayReviews = ({
  totalReviews,
  currentPage,
  setCurrentPage
}: IProps) => {
  const { reviews } = totalReviews;
  const { reviewsConnection } = totalReviews;
  const pageCounter = Math.ceil(
    reviewsConnection ? reviewsConnection?.aggregate?.count / 10 : 0
  );
  const handlePageClick = ({ selected }: any) => {
    console.log('selectedPage:', selected);
    setCurrentPage(selected);
  };
  console.log('reviews:', reviews);
  console.log('totalreviews:', totalReviews);

  return (
    <section id="reviews-display" className="mt-5 px-16">
      {reviews?.length === 0 && (
        <div className="text-[24px] text-[#333333] font-[600] px-16">
          No reviews Found
        </div>
      )}
      {reviews &&
        reviews.map((review: any) => (
          <div
            key={review?.id}
            id="review-card"
            className="flex flex-col border border-sky-300 px-6 py-2 mt-5"
          >
            <div className="flex gap-3">
              <h1 className="text-[24px] text-[#333333] font-[600]">{`-${review?.traveller}`}</h1>
              <div className="flex items-center">
                <Image
                  src={'/rating-star-yellow.svg'}
                  width={17}
                  height={17}
                  alt="rating star"
                />
                <p className=" px-2 text-[14px] text-[#333333] font-[500]">{`${review?.rating}/5`}</p>
              </div>
            </div>
            <p className="text-[24px] text-[#333333] font-[500] pt-2">
              {review?.title}
            </p>
            <p className="text-[24px] text-[#333333] font-[400] pt-1">
              {review?.review}
            </p>
            <p className="text-[18px] text-[#333333] font-[400] pt-6">
              <Moment format="MMMM DD, YYYY">{review?.date}</Moment>
            </p>
          </div>
        ))}
      <section id="pagination">
        <div className="w-[40%] ml-auto">
          <ReactPaginate
            breakLabel={<span className="mr-3">...</span>}
            nextLabel=">"
            onPageChange={handlePageClick}
            activeClassName="bg-orange-300"
            pageRangeDisplayed={5}
            pageCount={pageCounter}
            previousLabel="<"
            containerClassName="flex justify-center gap-3 mt-5"
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
