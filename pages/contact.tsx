import React from 'react';
import Image from 'next/image';
import ContactMsg from '../components/Contact/ContactMsg';
import PageHero from '../layouts/PageHero';
import ContactHeader from '../components/Contact/Header';
import OurLocation from '../components/Contact/Location';
import Adventure from '../components/Reviews/Adventure';
import { useQuery } from '@apollo/client';
import { FAQ_CONTENT, FAQ_PAGE_INTERFACE } from '../api/faqPage';
import client from '../apollo-client';
import Faqs from '../components/Contact/Faqs';
import Newsletter from '../layouts/Newsletter/Newsletter';

interface IProps {
  faqs: any;
}
const Contact = ({ faqs }: IProps) => {
  const canada_address: string[] = [
    '5779 Desson Avenue',
    'Niagara Falls',
    'Ontario, Canada L2G 3T5'
  ];
  const usa_address: string[] = [
    '486 19th street',
    'Niagara Falls',
    'Buffalo, USA NY 14303'
  ];
  return (
    <div id="Contact">
      <PageHero
        title="Contact Us"
        snippet="We'd love to hear from you"
        media="https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1920,y_0/v1582036498/Happy-group-tour-guides.jpg"
        video={false}
      />
      <ContactHeader />
      <ContactMsg />
      <OurLocation canada_address={canada_address} usa_address={usa_address} />
      <Faqs
        header={faqs?.sectionHeader}
        subHeader={faqs?.sectionSubheader}
        content={faqs?.sectionContent}
      />
      <Adventure />
      <Newsletter />
    </div>
  );
};
export async function getStaticProps() {
  const { data: faqs, error } = await client.query<FAQ_PAGE_INTERFACE>({
    query: FAQ_CONTENT
  });
  return {
    props: {
      faqs: faqs?.faqPage
    }
  };
}
export default Contact;
