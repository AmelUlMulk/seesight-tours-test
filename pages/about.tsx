import React from 'react';
import PageHero from '../components/Contact/PageHero';

const About = () => {
  return (
    <PageHero
      title={'Our Story'}
      snippet={
        'We provide intimate small-group tours of popular destinations across North America.'
      }
      media={
        'https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1440,y_0/v1582036498/Happy-group-tour-guides.jpg'
      }
      video={false}
    />
  );
};

export default About;
