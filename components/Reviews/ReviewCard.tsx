import Image from 'next/image';
import dayjs from 'dayjs';
interface IProps {
  review: Record<string, any>;
}
const ReviewCard = ({ review }: IProps) => {
  return (
    <div
      key={review?.id}
      id="review-card"
      className="flex flex-col border border-sky-300 px-5 xsm:px-10 pt-5 pb-3 mt-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 flex-wrap">
          <h2 className="xsm:text-[20px] sm:text-[24px] text-[#333333] font-[600]">{`-${review?.traveller}`}</h2>
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
      <p className="text-[12px] md:text-[18px] text-[#333333] font-[400] pt-6">
        {dayjs(`${review?.date}`).format('MMMM DD, YYYY')}
      </p>
    </div>
  );
};

export default ReviewCard;
