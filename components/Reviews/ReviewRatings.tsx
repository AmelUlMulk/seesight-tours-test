import { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useMediaQuery } from '../../layouts/NavBar';
interface IProps {
  totalReviews: Record<string, any>;
}
const ReviewRatings = ({ totalReviews }: IProps) => {
  const mediaQuery = useMediaQuery(640);
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

  return (
    <div className="w-[100%]">
      {Object.keys(reviews)
        .reverse()
        .map((item: any, index: number) => {
          const count = reviews[item]?.item?.connection?.aggregate?.count
            ? reviews[item]?.item?.connection?.aggregate?.count
            : 0;
          return (
            <div
              key={index}
              className="flex justify-center mt-2 w-[90%] mx-auto"
            >
              <span className="flex-none text-right w-[28%] xsm:w-[24%] sm:w-[16%] md:w-[25%] text-[12px] xsm:text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] text-[#333333] font-[400] px-2 ">{`${item} Stars`}</span>
              <ProgressBar
                completed={count}
                maxCompleted={
                  reviewsConnection?.aggregate?.count
                    ? reviewsConnection?.aggregate?.count
                    : 1
                }
                bgColor="#FF9921"
                isLabelVisible={false}
                height={mediaQuery ? '16px' : '20px'}
                className="w-[230px] xsm:w-[240px] sm:w-[300px] lg:w-[300px] xl:w-[350px] inline-block"
              />
              <span className="flex-none w-[14%] xsm:w-[20%] sm:w-[18%] text-[12px] xsm:text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px] text-[#333333] font-[400] pl-1 sm:px-2">
                {count ? count : 0}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ReviewRatings;
