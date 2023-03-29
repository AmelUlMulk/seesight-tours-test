import Image from 'next/image';

export const tagFee: Array<Record<string, any>> = [
  {
    title: 'Transparent',
    para: 'We believe open, accessible information is the best way to help others. We will represent ourselves and our intentions honestly to our coworkers and to our customers, sharing as much of the truth as we can without sacrificing our other values.'
  },
  {
    title: 'Accountable',
    para: 'We are personally responsible for outcomes. We communicate and honor our commitments to our customers and to each other. Results matter. How we show up also matters. We take ownership of our work, we learn from mistakes and we celebrate our successes.'
  },
  {
    title: 'Generous',
    para: 'We will over-deliver when we can, providing our community and our customers with more than their money’s worth. We believe in giving back without asking for anything in return and that providing value and help to others is its own reward.'
  },
  {
    title: 'Fun',
    para: "We work to see things from other people's perspectives. We will treat others the way we wish to be treated: with respect for their thoughts, feelings & opinions. We encourage free expression about our differences in opinion & backgrounds. We lean into difficult conversations, and seek to better understand each other."
  },
  {
    title: 'Empathetic',
    para: "We work to see things from other people's perspectives. We will treat others the way we wish to be treated: with respect for their thoughts, feelings & opinions. We encourage free expression about our differences in opinion & backgrounds. We lean into difficult conversations, and seek to better understand each other."
  },
  {
    title: 'Exceptional',
    para: 'The exception to the rule, we will avoid the assumption that existing norms are the right path. We choose to build our products and company in a way that critically examines best practices, often paving our own better path forward.'
  }
];
const TagfeeCode = () => {
  return (
    <div id="tagfeeCode" className="px-20 mt-10">
      <h1 className="text-[36px] font-[600] text-center">Our TAGFEE Code</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {tagFee.map((item: Record<string, any>, index: number) => (
          <div
            key={index}
            className="flex flex-col py-8 rounded-[10px] shadow-guidesBox items-center text-justify px-10"
          >
            <Image src="/diamond.svg" width={50} height={50} alt="tagfee" />
            <h2 className="text-[28px] font-[600] text-[#333333] mt-5">
              {item.title}
            </h2>
            <p className="text-[16px] font-[500] text-[#828282] mt-3">
              {item.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagfeeCode;
