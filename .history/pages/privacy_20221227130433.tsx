import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div className="bg-purple-400 w-screen h-60">
      <Image src={privacy} alt="Background Image" layout="fill" />
    </div>
  );
};

export default Privacy;
