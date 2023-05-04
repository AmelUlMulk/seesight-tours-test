import React from 'react';
import Image from 'next/image';
import { useMediaQuery } from '../hooks/mediaQuery';
import PageHero from '../layouts/PageHero';
import AvailablePositions from '../components/Careers/Positions';
import Adventure from '../components/Reviews/Adventure';
import Newsletter from '../layouts/Newsletter/Newsletter';
interface IProps {
  pk_openings: Record<string, any>;
  non_pk_openings: Record<string, any>;
}

const Careers = ({ pk_openings, non_pk_openings }: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <>
      <PageHero
        video={false}
        title="Work With Us"
        snippet="A Great Career at See Sight Tours"
        media="https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1920,y_0/v1582036498/Happy-group-tour-guides.jpg"
      />
      <div id="career">
        <h2 className="text-center text-[#333333] text-[18px] sm:text-[26px] lg:text-[36px] font-[600] mt-6">
          Connecting people through travel
        </h2>
        <section id="how-started" className="py-10 sm:py-16">
          <div className="flex flex-col-reverse md:flex-row w-[75%] mx-auto">
            <div className="flex-none text-center md:text-start md:w-[60%] md:pr-10 lg:pr-20 mt-5 md:mt-0">
              <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#333333] text-justify leading-[37px]">
                At See Sight Tours we care about employee happiness and
                fulfillment. Our local expert Tour Guides are fun, energetic and
                dedicated to greeting visitors from all over the world. Our
                Management Team thrives in our collaborative, hard working yet
                fun and relaxed work environment. At See Sight Tours we believe
                in empowering our employees and nurturing talent to provide
                opportunities growth, advancement and long term career
                opportunities within our company.
              </p>
              <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[500] text-[#333333] text-justify leading-[37px] mt-3">
                That’s why we’re rated N1 On Trip Advisor for Niagara Falls
                tours from 2013 to 2019!
              </p>
            </div>
            <div className="flex justify-center md:flex-none md:w-[40%] px-5 md:px-0">
              <Image
                src="/tour_experiences.png"
                width={mediaQuery ? 200 : 500}
                height={mediaQuery ? 200 : 500}
                quality={100}
                alt="tour experience"
                className="rounded-lg shadow-tourExpImgBox min-h-[180px] md:max-h-[350px]"
              />
            </div>
          </div>
        </section>
        <section id="next" className="py-10 sm:py-16 bg-[#E4F6F1]">
          <div className="flex flex-col md:flex-row w-[75%] mx-auto">
            <div className="flex justify-center md:flex-none md:w-[40%] md:pr-10">
              <Image
                src="/tour_experiences.png"
                width={mediaQuery ? 200 : 500}
                height={mediaQuery ? 200 : 500}
                quality={100}
                alt="tour experience"
                className="rounded-lg shadow-tourExpImgBox md:min-w-[250px] min-h-[180px] md:max-h-[350px]"
              />
            </div>
            <div className="flex-none md:w-[60%]">
              <h2 className="text-[18px] sm:text-[22px] lg:text-[28px] text-[#333333] text-center md:text-start font-[600] mt-5 md:mt-0">
                Culture
              </h2>
              <p className="text-[12px] sm:text-[14px] lg:text-[18px] text-[#333333] font-[400] text-justify leading-[37px] xl:pr-10">
                {`On our Team we celebrate individuality while working towards a
                common goal - to deliver to our guests the very best customer
                service and most enjoyable tour experience. Our thorough
                training ensures every Guide feels confident in delivering the
                "See Sight experience" while allowing the personalities of each
                Guide to shine through. Our Management Team works closely and
                collaboratively to support one another and the Team as a whole.`}
              </p>
            </div>
          </div>
        </section>
        <AvailablePositions
          pk_openings={pk_openings}
          non_pk_openings={non_pk_openings}
        />
      </div>
      <Adventure />
      <Newsletter />
    </>
  );
};
export async function getServerSideProps() {
  const res = await fetch('https://see-sight-tours.breezy.hr/json');
  const data = await res.json();
  const pk_openings = data.filter((opn: Record<string, any>) =>
    opn?.location.country.name.includes('Pakistan')
  );
  const non_pk_openings = data.filter(
    (opn: Record<string, any>) =>
      !opn?.location.country.name.includes('Pakistan')
  );
  return {
    props: {
      pk_openings,
      non_pk_openings
    }
  };
}
export default Careers;
