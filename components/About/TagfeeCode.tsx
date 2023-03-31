import Image from 'next/image';
import { useMediaQuery } from '../../hooks/mediaQuery';
import styled from 'styled-components';

export const tagFee: Array<Record<string, any>> = [
  {
    title: 'We are Fun!',
    para: 'At See Sight Tours, work is enjoyable! Our days are full of customer jokes and team meetings filled with laughter.',
    icon: '/Happiness.svg'
  },
  {
    title: 'We are Friggin’ Cool!',
    para: "We're a team of passionate guides and pros who work like a well-oiled machine to create awesome tourism experiences",
    icon: '/Cool.svg'
  },
  {
    title: 'We are Notable',
    para: 'Our team has an exceptional culture, from communication to problem-solving, making See Sight Tours stand out.',
    icon: '/Star.svg'
  },
  {
    title: 'We love our customers',
    para: 'Our team strives to exceed customer expectations and create personalized experiences from the moment a tour is booked.',
    icon: '/Heart.svg'
  }
];

const TagfeeCode = () => {
  const mediaQuery = useMediaQuery(640);
  return (
    <div id="tagfeeCode" className="mt-10">
      <div className="grid grid-cols-2 gap-5 w-[90%] mx-auto mt-5">
        {tagFee.map((item: Record<string, any>, index: number) => (
          <div
            key={index}
            className="flex flex-col py-5 sm:py-8 rounded-[10px] shadow-guidesBox items-center text-justify px-2 sm:px-3 lg:px-6 bg-[#E4F6F1]"
          >
            <Image
              src={item.icon}
              width={mediaQuery ? 25 : 50}
              height={mediaQuery ? 25 : 50}
              alt="tagfee"
            />
            <h2 className="text-[12px] sm:text-[16px] lg:text-[20px] text-center font-[600] text-[#333333] mt-5">
              {item.title}
            </h2>
            <p
              style={{ whiteSpace: 'break-spaces' }}
              className="text-[10px] sm:text-[14px] lg:text-[16px] font-[400] text-[#828282] text-center md:text-justify whitespace-break-spaces mt-3"
            >
              {item.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagfeeCode;
