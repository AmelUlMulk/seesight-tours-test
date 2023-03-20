import { useMediaQuery } from '../../hooks/mediaQuery';
import { TextShadow } from '../Landingpage/components/testimonials';
import GuidesDesk from './guidesDeskstop';
import GuidesMobile from './guidesMobile';

interface IProps {
  guidesData: any;
}
const OurGuides = ({ guidesData }: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <section
      id="our_guides"
      className="my-24 border-y-[1px] border-[#C5C5C5] bg-[#F5F5F5]"
    >
      <div
        id="guides-container"
        className=" py-10 xsm:px-12 md:px-28 lg:px-32 2xl:px-40"
      >
        <h1 className="text-[#333333] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[50px] 2xl:text-[56px] font-[700]">
          OUR GUIDES
        </h1>
        {mediaQuery ? (
          <GuidesMobile guidesData={guidesData?.guides} />
        ) : (
          <GuidesDesk guidesData={guidesData?.guides} />
        )}
      </div>
    </section>
  );
};

export default OurGuides;
