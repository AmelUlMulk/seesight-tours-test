import Image from 'next/image';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { SetStateAction } from 'react';
import { useMediaQuery } from '../../layouts/NavBar';
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
  const mediaQuery = useMediaQuery(640);
  const pageCounter = Math.ceil(
    reviewsConnection ? reviewsConnection?.aggregate?.count / 10 : 0
  );
  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <section id="reviews-display" className="mt-5 px-5 xsm:px-8 sm:px-16">
      {reviews?.length === 0 && (
        <div className="text-[24px] text-[#333333] font-[600] px-5 xsm:px-8 sm:px-16">
          No reviews Found
        </div>
      )}
      {reviews &&
        reviews.map((review: any) => (
          <div
            key={review?.id}
            id="review-card"
            className="flex flex-col border border-sky-300 px-5 xsm:px-10 pt-5 pb-3 mt-5"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3 flex-wrap">
                <h1 className="xsm:text-[20px] sm:text-[24px] text-[#333333] font-[600]">{`-${review?.traveller}`}</h1>
                <div className="flex items-center ">
                  <Image
                    src={'/rating-star-yellow.svg'}
                    width={17}
                    height={17}
                    alt="rating star"
                  />
                  <p className=" px-2 text-[14px] text-[#333333] font-[500]">{`${review?.rating}/5`}</p>
                </div>
              </div>

              <Image
                src={'/logos_google-icon.svg'}
                width={25}
                height={25}
                alt="google-icon"
              />
            </div>
            <p className="xxsm:text-[16px] xsm:text-[18px] sm:text-[24px] text-[#333333] font-[500] pt-2">
              {review?.title}
            </p>
            <p className="xxsm:text-[12px] xsm:text-[16px] sm:text-[24px] text-[#333333] font-[400] pt-1">
              {review?.review}
            </p>
            <p className="text-[18px] text-[#333333] font-[400] pt-6">
              <Moment format="MMMM DD, YYYY">{review?.date}</Moment>
            </p>
          </div>
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
