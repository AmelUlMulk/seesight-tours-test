import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div className="">
      <Image
        className="w-full  object-cover absolute"
        src="https://res.cloudinary.com/see-sight-tours/image/upload/w_1312,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581438789/top-ottawa-Parliament-Buildings.webP"
        width={200}
        height={100}
        alt="See sight Tours"
      />

      <h1 className="text-black text-6xl font-bold">Our Privacy Policy</h1>
      <h2 className="text-black text-3xl font-light mt-5">
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our Service and the choices you
        have associated with that data
      </h2>
    </div>
  );
};

export default Privacy;
