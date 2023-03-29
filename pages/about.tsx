import React from 'react';
import { GUIDESINTERFACE } from '../api/commonInterfaces';
import { GUIDES } from '../api/guides';
import { GUIDES_PAGE, GUIDES_PAGE_INTERFACE } from '../api/guidesPage';
import client from '../apollo-client';
import CompanyyHistory from '../components/About/ComapnyHistory';
import Header from '../components/About/Header';
import OurReviews from '../components/About/OurReviews';
import TagfeeCode from '../components/About/TagfeeCode';
import OurGuides from '../components/Guides/guides';
import { useMediaQuery } from '../hooks/mediaQuery';
import PageHero from '../layouts/PageHero';

interface IProps {
  guidesData: any;
}
const About = ({ guidesData }: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <div id="about-us">
      <PageHero
        video={false}
        title="Our Story"
        snippet="We provide intimate small-group tours of popular destinations across North America."
        media="https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1920,y_0/v1582036498/Happy-group-tour-guides.jpg"
      />
      <Header />
      <CompanyyHistory />
      <TagfeeCode />
      <OurGuides guidesData={guidesData} />
      <OurReviews />
    </div>
  );
};
export async function getServerSideProps() {
  const { data: guidesData } = await client.query<GUIDESINTERFACE>({
    query: GUIDES
  });
  return {
    props: {
      guidesData
    }
  };
}
export default About;
