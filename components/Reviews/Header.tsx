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
import { useMediaQuery } from '../../layouts/NavBar';

interface IProps {
  totalReviews: Record<string, any>;
  citiesPageDropDown: Record<string, any>[] | undefined;
  citiesDropDown: Record<string, any>;
}
interface StyleProps {
  isRated: number;
}

export interface MyErrorObject {
  product?: string;
  cities?: string;
  date?: string;
}

const ReviewsHeader = ({
  totalReviews,
  citiesPageDropDown,
  citiesDropDown
}: IProps) => {
  const [rating, setRating] = useState<number>(0);
  const { reviewsConnection } = totalReviews;
  const [dispModal, setDispModal] = useState<boolean>(false);
  const [errorObject, setErrorObject] = useState<MyErrorObject>({});
  const mediaQuery = useMediaQuery(640);
  const percentage: number = Number(
    parseFloat(reviewsConnection?.aggregate?.avg?.rating).toFixed(1)
  );

  //functions
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  //style
  const ReviewBtnStyle = styled.p<StyleProps>`
    background-color: ${props => (props.isRated > 0 ? '#e64141' : 'white')};
    color: ${props => (props.isRated > 0 ? 'white' : 'black')};
  `;

  return (
    <div id="reviews" className="bg-[#FFFFFF] pb-10">
      <section id="trustbar">
        <div className="w-[90%] sm:w-[80%] mx-auto">
          <div className="flex justify-center items-center xxsm:gap-2 xsm:gap-5 sm:gap-20">
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
        <div className="md:flex md:justify-center md:gap-12 lg:gap-36 xl:gap-60 pb-3 w-[90%] mx-auto">
          <div
            id="rating-stars"
            className="flex flex-col justify-center items-center"
          >
            <div className="xxsm:w-[190px] xxsm:h-[190px] xsm:w-[220px] xsm:h-[220px] sm:w-[300px] sm:h-[300px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]">
              <CircularProgressbarWithChildren
                value={(percentage / 5) * 100}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1,
                  pathColor: '#FF9921',
                  textColor: '#f88'
                })}
              >
                <div className="flex flex-col justify-center items-center">
                  <RatingStar className="xsm:mt-3 sm:mt-0" />
                  {reviewsConnection?.aggregate?.avg?.rating ? (
                    <>
                      <h3 className="xsm:text-[32px] sm:text-[56px] font-[700] text-[#333333]">
                        {parseFloat(
                          reviewsConnection?.aggregate?.avg?.rating
                        ).toFixed(1)}
                      </h3>
                      <p className="xsm:text-[20px] sm:text-[24px] font-[400] text-[#333333]">
                        Out of 5
                      </p>
                    </>
                  ) : (
                    <p className="text-[24px] font-[400] text-[#333333]">
                      Not Rated
                    </p>
                  )}
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <p className="  text-[16px] xsm:text-[20px] sm:text-[24px] font-[500] text-[#333333] my-3">
              Based on 10k ratings
            </p>
            <ReviewRatings totalReviews={totalReviews} />
          </div>

          <div
            id="write-review"
            className="flex flex-col items-center mt-10 md:mt-0"
          >
            <div className="xxsm:w-[190px] xxsm:h-[190px] xsm:w-[220px] xsm:h-[220px] sm:w-[350px] sm:h-[350px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]">
              <CircularProgressbarWithChildren
                value={rating * 20}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1,
                  pathColor:
                    rating < 2 ? 'red' : rating > 3 ? 'green' : 'yellow'
                })}
              >
                <div className="flex flex-col justify-center items-center">
                  <Rating
                    onClick={handleRating}
                    initialValue={rating}
                    transition
                    fillColor="orange"
                    emptyColor="#9B9B9B"
                    SVGstyle={{
                      display: 'inline-block'
                    }}
                    allowFraction
                    size={mediaQuery ? 30 : 40}
                  />

                  <p className="text-[24px] text-[#333333] font-[400]">
                    Rate IT!
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
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
          handleRating={handleRating}
          rating={rating}
          setRating={setRating}
          citiesDropDown={citiesDropDown}
          errorObject={errorObject}
          setErrorObject={setErrorObject}
        />
      )}
    </div>
  );
};

export default ReviewsHeader;
<div>
  <div></div>
</div>;
