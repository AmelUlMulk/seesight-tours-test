import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';
import FeaturedNavSection from '../FeaturedExperiences/FeaturedNavSec';
import Trustbar from '../Trust/Trustbar';
import PageHero from './Pagehero';

interface IProps {
  featuredExp: any;
  citydropdown: any;
}
const LandingPage = ({ featuredExp, citydropdown }: IProps) => {
  return (
    <>
      <PageHero />
      <Trustbar />
      <FeaturedExperiences
        featuredExp={featuredExp}
        citydropdown={citydropdown}
      />
    </>
  );
};

export default LandingPage;
