import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';

import Trustbar from '../Trust/Trustbar';
import LandingPageInfo from './components/landingpaginfo';

import LazyGuides from '../../utils/LazyLoadGuides';
import LazyLoadTestimonials from '../../utils/LazyLoadTestimonials';
import LazyCities from '../../utils/LazyLoadCities';
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
      <LazyCities data={data} citiesTotal={citiesTotal} />
      <LandingPageInfo />
      <LazyLoadTestimonials />
      <LazyGuides guidesData={guidesData} />
    </div>
  );
};

export default LandingPage;
