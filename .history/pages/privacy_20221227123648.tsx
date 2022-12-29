import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div>
      <Image src={privacy} alt="Background Image" background-size="auto" />
    </div>
  );
};

export default Privacy;
