import FeaturedExperiences from '../FeaturedExperiences/FeaturedExperiences';
import FeaturedNavSection from '../FeaturedExperiences/FeaturedNavSec';
import Trustbar from '../Trust/Trustbar';
import PageHero from './Pagehero';

const LandingPage = () => {
  return (
    <>
      <PageHero />
      <Trustbar />
      <FeaturedNavSection />
      <FeaturedExperiences />
    </>
  );
};

export default LandingPage;
