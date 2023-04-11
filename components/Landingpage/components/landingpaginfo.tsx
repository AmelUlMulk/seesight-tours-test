import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMediaQuery } from '../../../hooks/mediaQuery';
const landingpPageInfo = [
  {
    header: 'Small-Group Tours',
    paragraph:
      'Small-groups create connections and allow us to be flexible and go places where large groups don’t. No crowded buses, no microphones.',
    key: 'LPI0'
  },
  {
    header: 'Local Experiences',
    paragraph:
      'We believe in supporting the communities we live and operate in. By hiring locally, we create jobs to support the local economy and ensure guests receive an authentic experience.',
    key: 'LPI1'
  },
  {
    header: 'Friendly Guides',
    paragraph:
      'Our guides aim to create personal connections with each guest we serve. We truly care about delivering the best customer experience possible.',
    key: 'LPI2'
  }
];
interface StyleProps {
  isActive: boolean;
}
const ButtonStyle = styled.button<StyleProps>`
  transform: ${props => (props.isActive ? 'scale(1.4)' : 'scale(1)')};
  transition: transform 0.3s linear;
`;
const LandingPageInfo = () => {
  const [infoNum, setInfoNum] = useState<number>(1);
  const mediaQuery = useMediaQuery(767);

  return (
    <section
      id="landing_page_info"
      className="py-12 mx-10 sm:mx-20 md:mx-20 lg:mx-32 2xl:mx-40 border-b border-[#C5C5C5]"
    >
      <h1 className="text-[#333333] text-[18px] sm:text-[26px] lg:text-[36px] font-[700] pb-3">
        WHY US
      </h1>
      <div className="md:flex">
        <div
          id="image-wrapper"
          className="relative md:flex-none w-[100%] h-[320px] md:w-[50%] md:h-[300px] lg:h-[inherit] md:my-auto lg:m-0"
        >
          <Image
            src={'/Rectangle 6.png'}
            // width={833}
            // height={637}
            fill
            alt="Hornblower Niagara Cruises"
            className="object-cover rounded-lg"
          />
        </div>
        {mediaQuery ? (
          <>
            <div className="text-center xsm:mt-6 sm:mt-5 sm:px-12">
              {landingpPageInfo.map(
                (infoData: Record<string, string>, index: number) => {
                  return (
                    <div key={infoData.key} className="flex">
                      {index + 1 == infoNum && (
                        <div className="">
                          <h1 className="text-[18px] font-[600] text-[#333333]">
                            {infoData.header}
                          </h1>
                          <p className="text-[#828282] text-[12px] font-[500] leading-[30px]">
                            {infoData.paragraph.toLocaleUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
            <div>
              <div
                className="w-[40%] ml-auto
               mt-5 flex justify-between mr-5"
              >
                <ButtonStyle
                  isActive={infoNum === 1}
                  onClick={() => setInfoNum(1)}
                  className="text-[24px] font-[500] text-[#9B9B9B] px-3 py-2"
                >
                  01
                </ButtonStyle>
                <ButtonStyle
                  isActive={infoNum === 2}
                  onClick={() => setInfoNum(2)}
                  className="text-[24px] font-[500] text-[#9B9B9B] px-3 py-2"
                >
                  02
                </ButtonStyle>
                <ButtonStyle
                  isActive={infoNum === 3}
                  onClick={() => setInfoNum(3)}
                  className="text-[24px] font-[500] text-[#9B9B9B] px-2 py-2"
                >
                  03
                </ButtonStyle>
              </div>
            </div>
          </>
        ) : (
          <div className="md:flex-none md:w-[50%] md:max-h-[500px]">
            <div className="flex justify-between flex-col pl-5 h-[100%]">
              {landingpPageInfo.map(
                (infoData: Record<string, string>, index: number) => {
                  return (
                    <div key={infoData.key} className="flex">
                      <div className="pt-2">
                        <h1 className="text-[26px] font-[500] text-[#9B9B9B]">
                          0{index + 1}
                        </h1>
                      </div>
                      <div className="md:pl-6 lg:pl-8 xl:pl-14">
                        <h1 className="text-[16px] sm:text-[22px] lg:text-[28px] font-[600] text-[#333333]">
                          {infoData.header}
                        </h1>
                        <p className="text-[#828282] md:text-[14px] lg:text-[14px] xl:text-[16px] md:pt-2 lg:pt-5 font-[500]">
                          {infoData.paragraph.toLocaleUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingPageInfo;
