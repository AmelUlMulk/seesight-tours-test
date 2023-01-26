import { TextShadow } from '../Landingpage/components/testimonials';
import GuidesDesk from './guidesDeskstop';

interface IProps {
  guidesData: any;
}
const OurGuides = ({ guidesData }: IProps) => {
  return (
    <section
      id="our_guides"
      className="my-24 border-y-[1px] border-[#C5C5C5] bg-[#F5F5F5]"
    >
      <div id="guides-container" className="py-10 lg:px-32 2xl:px-40">
        <TextShadow className="text-[#333333] text-[56px] font-[600]">
          Our Guides
        </TextShadow>
        <GuidesDesk guidesData={guidesData?.guides} />
      </div>
    </section>
  );
};

export default OurGuides;
