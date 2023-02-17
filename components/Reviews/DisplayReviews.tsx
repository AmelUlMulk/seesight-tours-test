import Moment from 'react-moment';
import Image from 'next/image';
interface IProps {
  totalReviews: Record<string, any>;
}
const DisplayReviews = ({ totalReviews }: IProps) => {
  const { reviews } = totalReviews;
  console.log('reviews:', reviews);
  return (
    <section id="reviews-display" className="mt-5 px-16">
      {reviews &&
        reviews.map((review: any) => (
          <div
            key={review?.id}
            id="review-card"
            className="flex flex-col border border-sky-300 px-6 py-2 mt-5"
          >
            <div className="flex gap-3">
              <h1 className="text-[24px] font-[600]">{`-${review?.traveller}`}</h1>
              <div className="flex items-center">
                <Image
                  src={'/rating-star-yellow.svg'}
                  width={17}
                  height={17}
                  alt="rating star"
                />
                <p className=" px-2 text-[14px] font-[500]">{`${review?.rating}/5`}</p>
              </div>
            </div>
            <p className="text-[24px] font-[500] pt-2">{review?.title}</p>
            <p className="text-[24px] font-[400] pt-1">{review?.review}</p>
            <p className="text-[18px] font-[400] pt-6">
              <Moment format="MMMM DD, YYYY">{review?.date}</Moment>
            </p>
          </div>
        ))}
    </section>
  );
};

export default DisplayReviews;
