import { useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '../../hooks/mediaQuery';
import HeaderMobile from './HeaderMobile';
const ContactHeader = () => {
  const [index, setIndex] = useState(0);
  const mediaQuery = useMediaQuery(768);
  return (
    <section id="call-us" className="flex flex-col w-[90%] mx-auto py-10">
      <h2
        id="call-time"
        className="w-[90%] mx-auto text-[18px] sm:text-[24px] lg:text-[32px] font-[500] text-center text-[#333333]"
      >
        Call Us Anytime from: 8am - 4pm Monday-Friday
      </h2>
      {mediaQuery ? (
        <HeaderMobile />
      ) : (
        <div className=" flex text-white mt-5">
          <div className="flex-none w-[33.33%] px-2">
            <div className="bg-[#2191FA] rounded-[15px] py-2">
              <div className="flex flex-col gap-2 items-center">
                <Image
                  src="/tollfree.svg"
                  width={35}
                  height={35}
                  alt="toll free"
                />
                <h2 className="text-[18px] sm:text-[28px] lg:text-[36px] font-[600] ">
                  Toll Free
                </h2>
                <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[400]">
                  1-888-961-6584
                </p>
              </div>
            </div>
          </div>
          <div className="flex-none w-[33.33%] px-2">
            <div className="bg-[#2191FA] rounded-[15px] py-3">
              <div className="flex flex-col gap-2 items-center">
                <Image
                  src="/local.svg"
                  width={55}
                  height={55}
                  alt="toll free"
                />
                <h2 className=" text-[18px] sm:text-[28px] lg:text-[36px] font-[600] ">
                  Local
                </h2>
                <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[400]">
                  1-289-271-9767
                </p>
              </div>
            </div>
          </div>
          <div className="flex-none w-[33.33%] px-2">
            <div className="bg-[#2191FA] rounded-[15px] py-3">
              <div className="flex flex-col gap-2 items-center">
                <Image src="/fax.svg" width={55} height={55} alt="toll free" />
                <h2 className="text-[18px] sm:text-[28px] lg:text-[36px] font-[600] ">
                  Fax
                </h2>
                <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[400]">
                  1-888-908-6056
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactHeader;
