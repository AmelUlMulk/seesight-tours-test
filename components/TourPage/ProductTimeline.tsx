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
    <div className="chrono-cnt px-[2%] relative ">
      <div className="absolute w-[1px] h-[95%]   border border-blue-400 ml-[7px]   "></div>
      {timeline.map((value, index) => {
        return (
          <div
            key={value}
            className="flex gap-4 items-start md:items-start w-full   "
          >
            
            <div className=' w-4 h-4 bg-blue-400 rounded-full  '/>
            <p className="pb-4      text-sm md:text-2xl w-[95%] ">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductTimeline;
