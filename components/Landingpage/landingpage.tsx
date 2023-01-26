import { HOMEPAGEINTERFACE } from '../../graphql_api/homePage';
import Home from '../../pages';
import Guides from '../../pages/guides';
import OurCities from '../FeaturedCities/OurCities';
import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';
import FeaturedNavSection from '../FeaturedExperiences/FeaturedNavSec';
import OurGuides from '../Guides/guides';
import Newsletter from '../Newsletter/newsletter';
import Trustbar from '../Trust/Trustbar';
import LandingPageInfo from './components/landingpaginfo';
import Testimonials from './components/testimonials';
import PageHero from './Pagehero';

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
    <>
      <Trustbar />
      <FeaturedExperiences
        featuredExp={featuredExp}
        citydropdown={citydropdown}
      />
      <OurCities
        title="Our Cities"
        subTitle="Let us show you the places we call home"
        FeaturedCities={data}
        citiesTotalCount={citiesTotal ? citiesTotal.aggregate.totalCount : 0}
      />
      <LandingPageInfo />
      <Testimonials />
      <OurGuides guidesData={guidesData} />
      <Newsletter />
    </>
  );
};

export default LandingPage;
