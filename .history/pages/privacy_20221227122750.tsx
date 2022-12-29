import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div className=" bg-purple-400">
      <Image src={privacy} alt="Background Image" width="240" height="100px" />
    </div>
  );
};

export default Privacy;
