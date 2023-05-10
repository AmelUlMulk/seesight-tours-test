import OurCities from '../FeaturedCities/OurCities';

import Trustbar from '../Trust/Trustbar';
import LandingPageInfo from './components/landingpaginfo';
import dynamic from 'next/dynamic';

const Newsletter = dynamic(() => import('../Newsletter/newsletter'));
const Testimonials = dynamic(() => import('./components/testimonials'), {
  ssr: false
});

const OurGuides = dynamic(() => import('../Guides/guides'), {
  ssr: false
});

const FeaturedExperiences = dynamic(
  () => import('../FeaturedExperiences/FeaturedExperiences'),
  {
    ssr: false
  }
);

interface IProps {
  featuredExp: any;
  citydropdown: any;
  HomePage: any;
  guidesData: any;
}
const LandingPage = ({
  featuredExp,
  citydropdown,
  HomePage,
  guidesData
}: IProps) => {
  const { homePage: { cities: [...data] = [] } = {}, citiesTotal } = HomePage;
  return (
    <div id="landing-page" className="bg-[#F5F5F5]">
      <Trustbar />
      <FeaturedExperiences
        featuredExp={featuredExp}
        citydropdown={citydropdown}
      />
      <OurCities
        title="OUR CITIES"
        subTitle="Let us show you the places we call home"
        FeaturedCities={data}
        citiesTotalCount={citiesTotal ? citiesTotal.aggregate.totalCount : 0}
      />
      <LandingPageInfo />
      <Testimonials />
      <OurGuides guidesData={guidesData} />
    </div>
  );
};

export default LandingPage;
