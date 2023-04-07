import Image from 'next/image';
import { useMediaQuery } from '../../hooks/mediaQuery';

const CompanyyHistory = () => {
  const mediaQuery = useMediaQuery(768);
  return (
    <>
      <section id="how-started" className="py-16 bg-[#E4F6F1] mt-20">
        <div className="flex flex-col-reverse md:flex-row w-[75%] mx-auto">
          <div className="flex-none text-center md:text-start md:w-[60%] md:pr-10 lg:pr-20 mt-5 md:mt-0">
            <h2 className="text-[18px] sm:text-[26px] lg:text-[36px] font-[600] text-[#333333]">
              What Started See Sight Tours
            </h2>
            <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#333333] text-justify leading-[37px]">
              Daud Grewal was always inspired by his mentor who taught him it’s
              never too early when it comes to starting a business which got
              stuck with Daud. He was looking for an opportunity that would not
              require a heavy initial investment while supporting his family and
              benefiting the local community. And then the opportunity presented
              itself. While working as an usher at an IMAX theater in Niagara
              Falls, Daud saw large tour groups, all crammed in those big tour
              buses, and realized that he can do it way better than them. 
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
      <section id="next" className="py-16">
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
            <h2 className="text-[18px] sm:text-[26px] lg:text-[36px] text-[#333333] text-center md:text-start font-[600] mt-5 md:mt-0">
              Next…
            </h2>
            <p className="text-[12px] sm:text-[14px] lg:text-[18px] text-[#333333] font-[400] text-justify leading-[37px] xl:pr-10">
              Daud’s idea was simple - he would give personable, private tour
              experiences using his mother’s minivan. He hastily drafted an
              18-point plan on the back of a parking lot sheet and attempted to
              sell his tours from a makeshift booth with a handmade sign. After
              weeks with no success, Daud almost gave up and sought another job.
              But, on July 1st, 2006, he made his first sale, which marked the
              beginning of a remarkable journey- The Beginning of See Sight
              Tours
            </p>
          </div>
        </div>
      </section>
      <section id="company-growth" className="py-16 bg-[#E4F6F1]">
        <div className="flex flex-col-reverse md:flex-row w-[75%] mx-auto">
          <div className="flex-none text-center md:text-start md:w-[60%] md:pr-10 lg:pr-20 mt-5 md:mt-0">
            <h2 className="text-[18px] sm:text-[26px] lg:text-[36px] font-[600] text-[#333333]">
              On and On We Go!
            </h2>
            <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#333333] text-justify leading-[37px]">
              Since its inception in 2006, See Sight Tours has grown
              significantly, expanding its reach to multiple cities across North
              America, including Toronto, Vancouver, Boston, Niagara Falls, and
              more. The company has continually evolved to meet the changing
              needs of the tourism industry. Today, See Sight Tours has
              partnerships with major hotels and travel companies, a reputation
              for quality service, and has become a leading tour operator in
              North America.
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
      <section id="challenges" className="py-16">
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
            <h2 className="text-[18px] sm:text-[26px] lg:text-[36px] text-[#333333] text-center md:text-start font-[600] mt-5 md:mt-0">
              And We Rose Like a Boss!
            </h2>
            <p className="text-[12px] sm:text-[14px] lg:text-[18px] text-[#333333] font-[400] text-justify leading-[37px] xl:pr-10">
              See Sight Tours was hit hard by the COVID-19 pandemic, resulting
              in temporary shutdowns, cancellations of tours, layoffs, and
              financial difficulties. However, the company adapted by adhering
              to safety protocols to maintain customer and employee safety. No
              matter how many years have passed and what challenges we faced, we
              always kept our vision: providing local, personable experiences to
              tourists, and making them feel closer to the destination. 
            </p>
          </div>
        </div>
      </section>
      <section id="our-culture">
        <div className="w-[75%] mx-auto">
          <h2 className="text-center text-[18px] sm:text-[26px] lg:text-[36px] font-[600] text-[#333333]">
            Our Culture
          </h2>
          <p className="text-center text-[12px] sm:text-[14px] lg:text-[18px] font-[400] mt-5 leading-[37px] text-[#333333]">
            See Sight Tours believes in creating a welcoming space where
            everyone can feel valued, regardless of their background or
            experience. From our tour guides to our customers, we strive to
            provide an inclusive community where every voice is heard,
            respected, and given the opportunity to thrive. 
          </p>
        </div>
      </section>
    </>
  );
};

export default CompanyyHistory;
