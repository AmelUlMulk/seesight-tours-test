import Head from 'next/head';
import Image from 'next/image';
import LandingPage from '../components/Landingpage/landingpage';
import PageHero from '../layouts/PageHero';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import FEATUREDEXPERIENCES from '../api/featuredexperiences';
import { FEATURED_EXPERIENCES_INTERFACE } from '../api/featuredexperiences';
import { HOMEPAGE, HOMEPAGEINTERFACE } from '../api/homePage';
import { GUIDESINTERFACE } from '../api/commonInterfaces';
import { GUIDES } from '../api/guides';
import SearchCity from '../components/Searchbar/searchCity';
import Newsletter from '../layouts/Newsletter/Newsletter';
import CitiesModal from '../components/CitiesModal.tsx';

interface IProps {
  featuredExp: any;
  citydropdown: any;
  HomePage: any;
  guidesData: any;
}
export default function Home({
  featuredExp,
  citydropdown,
  HomePage,
  guidesData
}: IProps) {
  return (
    <>
      <Head>
        <title className="text-3xl font-bold underline">See Sight Tours</title>
        <meta
          property="og:description"
          content={HomePage?.homePage?.metaDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={HomePage?.homePage?.canonical} />
      </Head>
      <main className="pb-20 bg-[#F5F5F5]">
        <section id="hero" className="relative">
          <PageHero
            title={'Small Group Tours'}
            snippet={
              'Best Small Group Tours. Operating Across Canada and the United States'
            }
            media="https://res.cloudinary.com/see-sight-tours/video/upload/v1658237954/landing-page-hero_mu19mc.mp4"
            video={true}
            landing
          />
          <CitiesModal />
        </section>

        <LandingPage
          featuredExp={featuredExp}
          citydropdown={citydropdown}
          HomePage={HomePage}
          guidesData={guidesData}
        />
        <Newsletter />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query<FEATURED_EXPERIENCES_INTERFACE>({
    query: FEATUREDEXPERIENCES,
    variables: {
      dayTours: false,
      multiday: false,
      airportTransfers: false
    }
  });
  const { data: HomePage } = await client.query<HOMEPAGEINTERFACE>({
    query: HOMEPAGE,
    variables: {
      guides: false
    }
  });
  const { data: guidesData } = await client.query<GUIDESINTERFACE>({
    query: GUIDES
  });
  return {
    props: {
      featuredExp: data.homePage,
      citydropdown: data.citiesDropdown,
      HomePage: HomePage,
      guidesData
    }
  };
}
