import Image from 'next/image';
import RatingStar from '../../assets/svg/rating-star-yellow.svg';
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReviewRatings from './ReviewRatings';

interface IProps {
  totalReviews: Record<string, any>;
}
const ReviewsHeader = ({ totalReviews }: IProps) => {
  const percentage = 80;
  return (
    <div id="reviews" className="bg-[#FFFFFF]">
      <section id="trustbar">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-center items-center gap-10">
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
        <div className="flex justify-center gap-10">
          <div className="flex flex-col justify-center items-center">
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
                  <h3 className="text-[56px] font-[700]">4.8</h3>
                  <p className="text-[24px] font-[400]">Out of 5</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <p className="text-[24px] font-[400]">Based on 10k ratings</p>
            <ReviewRatings totalReviews={totalReviews} />
          </div>

          <div></div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsHeader;
<div>
  <div></div>
</div>;
