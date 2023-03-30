import Image from 'next/image';

export const tagFee: Array<Record<string, any>> = [
  {
    title: 'We are Fun!',
    para: 'At See Sight Tours, work is enjoyable! Our days are full of customer jokes and team meetings filled with laughter.'
  },
  {
    title: 'We are Friggin’ Cool!',
    para: "We're a team of passionate guides and pros who work like a well-oiled machine to create awesome tourism experiences"
  },
  {
    title: 'We are Notable',
    para: 'Our team has an exceptional culture, from communication to problem-solving, making See Sight Tours stand out.'
  },
  {
    title: 'We love our customers',
    para: 'Our team strives to exceed customer expectations and create personalized experiences from the moment a tour is booked.'
  }
];
const TagfeeCode = () => {
  return (
    <div id="tagfeeCode" className="mt-10">
      <h1 className="text-[36px] font-[600] text-center ">Our TAGFEE Code</h1>
      <div className="grid grid-cols-2 gap-5 w-[60%] mx-auto mt-5">
        {tagFee.map((item: Record<string, any>, index: number) => (
          <div
            key={index}
            className="flex flex-col py-8 rounded-[10px] shadow-guidesBox items-center text-justify px-10"
          >
            <Image src="/diamond.svg" width={50} height={50} alt="tagfee" />
            <h2 className="text-[12px] sm:text-[18px] lg:text-[28px] font-[600] text-[#333333] mt-5">
              {item.title}
            </h2>
            <p className="text-[10px] sm:text-[14px] lg:text-[16px] font-[500] text-[#828282] mt-3">
              {item.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagfeeCode;
