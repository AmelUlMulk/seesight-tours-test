import { HOMEPAGEINTERFACE } from '../../graphql_api/homePage';
import Home from '../../pages';
import OurCities from '../FeaturedCities/OurCities';
import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';
import FeaturedNavSection from '../FeaturedExperiences/FeaturedNavSec';
import Newsletter from '../Newsletter/newsletter';
import Trustbar from '../Trust/Trustbar';
import PageHero from './Pagehero';

interface IProps {
  allfeaturedata: any;
  featuredExp: any;
  citydropdown: any;
  HomePage: any;
}
const LandingPage = ({
  allfeaturedata,
  featuredExp,
  citydropdown,
  HomePage
}: IProps) => {
  const {
    homePage,
    homePage: { cities: [...data] = [] } = {},
    citiesTotal
  } = HomePage;
  console.log('all data:', allfeaturedata);
  return (
    <>
      <PageHero />
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
      <Newsletter />
    </>
  );
};

export default LandingPage;
