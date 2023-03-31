import React from 'react';
import { RATINGCOUNT } from '../../pages/tours/[slug]';
import ReviewSwipper from './ReviewSwipper';
interface Rating {
  productName: string;
  ratingCounts: RATINGCOUNT;
  reviews: [
    {
      rating: number;
      review: string;
      traveller: string;
    }
  ];
}
const pr = (number: number) => {
  console.log('the thing is', (number / 100) * 100);
  return `${(number / 100) * 100}%`;
};
const Rating = ({ productName, ratingCounts, reviews }: Rating) => {
  console.log('the reviews', reviews);
  return (
    <div
      id="reviews"
      className=" px-[2%] 2xl:px-[10%] py-[2%] flex flex-col md:flex-row md:gap-10 item-center     "
    >
      <div className="flex flex-col mt-14 md:w-1/2 ">
        <div className="flex items-center  font-semibold mb-2 ">
          <span className="w-[10%]">5 Stars </span>
          <div className="flex-1 mr-4 flex items-center bg-gray-200 min-w-[70%] h-6 border-gray-300 border rounded-lg ml-2  ">
            <div
              className={` h-5 bg-orange-500 rounded-lg  `}
              style={{ width: pr(ratingCounts[5]) }}
            />
          </div>
          <span>{ratingCounts[5]}</span>
        </div>
        <div className="flex items-center  font-semibold my-2 ">
          <span className="w-[10%]">4 Stars </span>
          <div className="flex-1 mr-4 flex items-center bg-gray-200 min-w-[70%] h-6 border-gray-300 border rounded-lg ml-2  ">
            <div
              className={` h-5 bg-orange-500 rounded-lg `}
              style={{ width: pr(ratingCounts[4]) }}
            />
          </div>
          <span>{ratingCounts[4]}</span>
        </div>
        <div className="flex items-center  font-semibold my-2 ">
          <span className="w-[10%]">3 Stars </span>
          <div className="flex-1 mr-4 flex items-center bg-gray-200 min-w-[70%] h-6 border-gray-300 border rounded-lg ml-2  ">
            <div
              className={` h-5 bg-orange-500 rounded-lg  `}
              style={{ width: pr(ratingCounts[3]) }}
            />
          </div>
          <span>{ratingCounts[3]}</span>
        </div>
        <div className="flex items-center  font-semibold my-2 ">
          <span className="w-[10%]">2 Stars </span>
          <div className="flex-1 mr-4 flex items-center bg-gray-200 min-w-[70%] h-6 border-gray-300 border rounded-lg ml-2  ">
            <div
              className={` h-5 bg-orange-500 rounded-lg  `}
              style={{ width: pr(ratingCounts[2]) }}
            />
          </div>
          <span>{ratingCounts[2]}</span>
        </div>
        <div className="flex items-center  font-semibold my-2 ">
          <span className="w-[10%]">1 Stars </span>
          <div className="flex-1 mr-4 flex items-center bg-gray-200 min-w-[70%] h-6 border-gray-300 border rounded-lg ml-2  ">
            <div
              className={` h-5 bg-orange-500 rounded-lg  `}
              style={{ width: pr(ratingCounts[1]) }}
            />
          </div>
          <span>{ratingCounts[1]}</span>
        </div>
      </div>
      <ReviewSwipper reviews={reviews} />
    </div>
  );
};

export default Rating;
