import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div className="w-screen h-60">
      <Image src={privacy} alt="Background Image" width={200} height={400} />
    </div>
  );
};

export default Privacy;
