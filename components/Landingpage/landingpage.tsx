import OurCities from '../FeaturedCities/OurCities';
import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';

import Trustbar from '../Trust/Trustbar';
import LandingPageInfo from './components/landingpaginfo';

import LazyGuides from '../../utils/LazyLoadGuides';
import LazyLoadTestimonials from '../../utils/LazyLoadTestimonials';

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
      <LazyLoadTestimonials />
      <LazyGuides guidesData={guidesData} />
    </div>
  );
};

export default LandingPage;
