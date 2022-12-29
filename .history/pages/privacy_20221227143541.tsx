import React from 'react';
import Image from 'next/image';
import privacy from '../layouts/images/privacy.png';

const Privacy = () => {
  return (
    <div className="max-w-full">
      <Image
        src="https://res.cloudinary.com/see-sight-tours/image/upload/w_1920,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581438789/top-ottawa-Parliament-Buildings.webP"
        alt="Background Image"
        width={2211}
        height={700}
      />
    </div>
  );
};

export default Privacy;
