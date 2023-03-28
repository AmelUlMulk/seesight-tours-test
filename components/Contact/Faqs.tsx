import Image from 'next/image';
import { useState } from 'react';
import { useMediaQuery } from '../../hooks/mediaQuery';
import styled from 'styled-components';
interface IProps {
  header: string;
  subHeader: string;
  content: any;
}
const ContentStyle = styled.p`
  animation: slowDown 500ms linear forwards;
  @keyframes slowDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const Faqs = ({ header, subHeader, content }: IProps) => {
  const [toggleFaq, setToggleFaq] = useState<boolean[]>(
    content.map(() => false)
  );
  const mediaQuery = useMediaQuery(640);
  const handleToggleFaq = (index: number) => {
    setToggleFaq(prev =>
      prev.map((value, i) => (i === index ? !value : false))
    );
  };
  return (
    <div id="faqs" className="w-full md:w-[90%] mx-auto py-10">
      <h2 className="text-[18px] sm:text-[26px] lg:text-[36px] font-[600] text-[#333333] w-[90%] md:w-full mx-auto">
        {header}
      </h2>
      <h4 className="text-[16px] sm:text-[18px] lg:text-[24px] font-[400] text-[#333333] w-[90%] md:w-full mx-auto mb-2">
        {subHeader}
      </h4>
      {content.map((section: Record<string, any>, index: number) => (
        <div
          id="faq"
          key={index}
          className="bg-[#DFDFDF] rounded-[10px] mb-3 p-3"
        >
          <div className="flex justify-between items-center">
            <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-[400] mb-3">
              {Object.keys(section)[0]}
            </p>
            <div onClick={() => handleToggleFaq(index)}>
              <Image
                src="/dropdownRed.svg"
                width={mediaQuery ? 25 : 35}
                height={mediaQuery ? 25 : 35}
                alt="dropdown icon"
                className={`rotate-180 ${
                  toggleFaq[index] && 'rotate-0'
                } hover:cursor-pointer transition-rotate duration-500`}
              />
            </div>
          </div>

          {toggleFaq[index] && (
            <ContentStyle
              id="faq-ans"
              className={`text-[12px] sm:text-[14px] lg:text-[20px] font-[400] `}
            >
              {Object.values(section)[0]}
            </ContentStyle>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;
