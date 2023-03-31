/* eslint-disable */
import React from 'react';
import Image from 'next/image';
interface Iprops {
  description: string;
}

const ProductTimeline = ({ description }: Iprops): JSX.Element => {
  const desc = description.trim();
  let timeline;
  if (desc.includes('\n\n')) {
    timeline = desc.split('\n\n');
  } else if (desc.includes('\n')) {
    timeline = desc.split('\n');
  } else if (desc.includes('<br><br>')) {
    timeline = desc.split('<br><br>');
  } else {
    timeline = [desc];
  }
  return (
    <div className="chrono-cnt px-[2%] ">
      {timeline.map((value, index) => {
        return (
          <div
            key={value}
            className="flex gap-4 items-start md:items-center w-full"
          >
            <Image
              src="/hand.png"
              width={30}
              height={20}
              alt="hand-icon"
              className="  md:max-h-6 max-h-3 max-w-[20px] md:max-w-[40px] mt-[6px]   "
            />
            <p className="pb-4 text-sm md:text-2xl w-[95%] ">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductTimeline;
