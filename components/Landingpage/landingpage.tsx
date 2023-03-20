import OurCities from '../FeaturedCities/OurCities';
import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';
import OurGuides from '../Guides/guides';
import Newsletter from '../Newsletter/newsletter';
import SearchCity from '../Searchbar/searchCity';
import Trustbar from '../Trust/Trustbar';
import LandingPageInfo from './components/landingpaginfo';
import Testimonials from './components/testimonials';

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
