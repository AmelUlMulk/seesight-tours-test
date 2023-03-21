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
    <div className="chrono-cnt">
      {timeline.map((value, index) => {
        return (
          <div key={value} className="flex gap-4 items-center w-full">
            <Image
              src="/hand.png"
              width={30}
              height={20}
              alt="hand-icon"
              className=" max-h-6 "
            />
            <p className="py-4 text-2xl w-[95%] ">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductTimeline;
