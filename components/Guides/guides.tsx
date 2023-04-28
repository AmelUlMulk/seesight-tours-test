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
    <section id="our_guides" className="mt-20 bg-[#F5F5F5]">
      <div
        id="guides-container"
        className=" pt-10 pb-40 w-[90%] mx-auto border-y border-[#C5C5C5]"
      >
        <h1 className="text-[#333333] text-[18px] sm:text-[26px] lg:text-[36px] font-[600]">
          Our Guides
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
