import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div className="h-87 w-full bg-cover bg-center p-24">
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
