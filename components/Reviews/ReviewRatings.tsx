import { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
interface IProps {
  totalReviews: Record<string, any>;
}
const ReviewRatings = ({ totalReviews }: IProps) => {
  const { reviewsConnection } = totalReviews;
  const [reviews, setReviews] = useState<any>({});
  const filteredReviews = () => {
    const object: any = {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {}
    };
    reviewsConnection?.groupBy?.rating.map((item: any) => {
      const { key } = item;
      if (key === 4.5) {
        return;
      }
      object[Math.round(key)] = object[Math.round(key)]
        ? { ...object[Math.round(key)], item }
        : { item };
    });
    return object;
  };
  useEffect(() => {
    setReviews(filteredReviews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalReviews]);
  // console.log('ReviewConnection:', reviewsConnection);
  // console.log('ratingReviews:', reviews);
  return (
    <div>
      {Object.keys(reviews)
        .reverse()
        .map((item: any, index: number) => {
          const count = reviews[item]?.item?.connection?.aggregate?.count
            ? reviews[item]?.item?.connection?.aggregate?.count
            : 0;
          return (
            <div key={index}>
              <span className="text-[18px] md:text-[20px] xl:text-[22px] text-[#333333] font-[400] px-2">{`${item} Stars`}</span>
              <ProgressBar
                completed={count}
                maxCompleted={
                  reviewsConnection?.aggregate?.count
                    ? reviewsConnection?.aggregate?.count
                    : 1
                }
                bgColor="#FF9921"
                isLabelVisible={false}
                // height="20px"
                className="w-[300px] md:w-[160px] lg:w-[300px] xl:w-[350px] inline-block"
              />
              <span className="text-[18px] md:text-[20px] xl:text-[22px] text-[#333333] font-[400] px-2">
                {count ? count : 0}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ReviewRatings;
