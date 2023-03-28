import Image from 'next/image';
import { useState } from 'react';
interface IProps {
  header: string;
  subHeader: string;
  content: any;
}

const Faqs = ({ header, subHeader, content }: IProps) => {
  const [toggleFaq, setToggleFaq] = useState<boolean[]>(
    content.map(() => false)
  );

  const handleToggleFaq = (index: number) => {
    setToggleFaq(prev =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };
  return (
    <div id="faqs" className="w-[80%] mx-auto py-10">
      <h2 className="text-[36px] font-[600] text-[#333333]">{header}</h2>
      <h4 className="text-[24px] font-[400] text-[#333333]">{subHeader}</h4>
      {content.map((section: Record<string, any>, index: number) => (
        <div
          id="faq"
          key={index}
          className="bg-[#DFDFDF] rounded-[10px] mb-3 p-3"
        >
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-[400] mb-3">
              {Object.keys(section)[0]}
            </p>
            <div onClick={() => handleToggleFaq(index)}>
              <Image
                src="/dropdownRed.svg"
                width={35}
                height={35}
                alt="faqs dropdown"
                className={`rotate-180 ${toggleFaq[index] && 'rotate-0'}`}
              />
            </div>
          </div>

          {toggleFaq[index] && (
            <p id="faq-ans" className="text-[20px] font-[400]">
              {Object.values(section)[0]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;
