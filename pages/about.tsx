import React from 'react';
import Head from 'next/head';
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
import Newsletter from '../layouts/Newsletter/Newsletter';

interface IProps {
  guidesData: any;
}
const About = ({ guidesData }: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <>
      <Head>
        <title className="text-3xl font-bold underline">About Us</title>
        <meta name="description" content="The See Sight Tours About" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.seesight-tours.com/about" />
      </Head>
      <div id="about-us">
        <PageHero
          video={false}
          title="OUR STORY"
          snippet="We provide intimate small-group tours of popular destinations across North America."
          media="https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1920,y_0/v1582036498/Happy-group-tour-guides.jpg"
        />
        <Header />
        <CompanyyHistory />
        <TagfeeCode />
        <OurGuides guidesData={guidesData} />
        <OurReviews />
        <Newsletter />
      </div>
    </>
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
