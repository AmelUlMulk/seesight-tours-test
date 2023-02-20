import Image from 'next/image';
import styled from 'styled-components';
import RatingStar from '../../assets/svg/rating-star-yellow.svg';
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Rating } from 'react-simple-star-rating';
import ReviewRatings from './ReviewRatings';
import { useState } from 'react';
import AddReview from './AddReview';

interface IProps {
  totalReviews: Record<string, any>;
  citiesPageDropDown: Record<string, any>[] | undefined;
}
interface StyleProps {
  isRated: number;
}
const ReviewsHeader = ({ totalReviews, citiesPageDropDown }: IProps) => {
  const [rating, setRating] = useState<number>(0);
  const { reviewsConnection } = totalReviews;
  const [dispModal, setDispModal] = useState<boolean>(false);
  const percentage = 80;

  //functions
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);
  //style
  const ReviewBtnStyle = styled.p<StyleProps>`
    background-color: ${props => (props.isRated > 0 ? '#e64141' : 'white')};
    color: ${props => (props.isRated > 0 ? 'white' : 'black')};
  `;
  //display data
  console.log('ratings:', rating);
  console.log('totalReviews:', totalReviews);
  return (
    <div id="reviews" className="bg-[#FFFFFF] pb-10">
      <section id="trustbar">
        <div className="w-[80%] mx-auto">
          <div className="flex justify-center items-center gap-20">
            <div>
              <Image
                src={'/tripadvisorlogo.svg'}
                width={230}
                height={124}
                alt="expedia"
              />
            </div>
            <div>
              <Image
                src={'/viatorlogo.svg'}
                width={230}
                height={124}
                alt="expedia"
              />
            </div>
            <div>
              <Image
                src={'/expedialogo.svg'}
                width={230}
                height={124}
                alt="expedia"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="ratings">
        <div className="flex justify-center gap-20 pb-3 w-[80%] mx-auto">
          <div
            id="rating-stars"
            className="flex flex-col justify-center items-center"
          >
            <div className="w-[300px] h-[300px]">
              <CircularProgressbarWithChildren
                value={percentage}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1,
                  pathColor: '#FF9921',
                  textColor: '#f88'
                })}
              >
                <div className="flex flex-col justify-center items-center">
                  <RatingStar />
                  {/* <Image src={} width={66} height={66} alt="rating star" /> */}
                  <h3 className="text-[56px] font-[700] text-[#333333]">
                    {parseFloat(
                      reviewsConnection?.aggregate?.avg?.rating
                    ).toFixed(1)}
                  </h3>
                  <p className="text-[24px] font-[400] text-[#333333]">
                    Out of 5
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <p className="text-[24px] font-[400] text-[#333333]">
              Based on 10k ratings
            </p>
            <ReviewRatings totalReviews={totalReviews} />
          </div>

          <div id="write-review" className="flex flex-col">
            <CircularProgressbarWithChildren
              value={rating * 20}
              styles={buildStyles({
                strokeLinecap: 'round',
                pathTransitionDuration: 1,
                pathColor: rating < 2 ? 'red' : rating > 3 ? 'green' : 'yellow'
              })}
            >
              <div className="flex flex-col justify-center items-center">
                <Rating
                  onClick={handleRating}
                  initialValue={rating}
                  transition
                  fillColor="orange"
                  emptyColor="gray"
                  SVGstyle={{ display: 'inline-block' }}
                  allowFraction
                />

                <p className="text-[24px] text-[#333333] font-[400]">
                  Rate IT!
                </p>
              </div>
            </CircularProgressbarWithChildren>
            <div className="flex flex-col justify-center items-center pt-16">
              <p className="text-[24px]text-[#333333] font-[400]">
                Have you Traveled with US?
              </p>
              <div className="flex justify-center pt-5">
                <ReviewBtnStyle
                  isRated={rating}
                  className=" text-[22px] text-[#333333] font-[400] border border-red-300 rounded-[5px] px-2 py-1 hover:cursor-pointer hover:bg-[#e64141] hover:text-white"
                  onClick={() => setDispModal(!dispModal)}
                >
                  Write a Review
                </ReviewBtnStyle>
              </div>
            </div>
          </div>
        </div>
      </section>
      {dispModal && (
        <AddReview
          dispModal={dispModal}
          setDispModal={setDispModal}
          citiesPageDropDown={citiesPageDropDown}
        />
      )}
    </div>
  );
};

export default ReviewsHeader;
<div>
  <div></div>
</div>;
