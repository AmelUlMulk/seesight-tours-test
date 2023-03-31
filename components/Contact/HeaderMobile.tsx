import { useState } from 'react';
import Image from 'next/image';
const HeaderMobile = () => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="w-[70%] bg-[#2191FA] mx-auto rounded-[15px] py-3 mt-5 text-white">
        {index === 0 && (
          <div className="flex flex-col gap-2 items-center">
            <Image src="/tollfree.svg" width={35} height={35} alt="toll free" />
            <h2 className="text-[18px] sm:text-[28px] lg:text-[36px] font-[600] ">
              Toll Free
            </h2>
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[400]">
              1-888-961-6584
            </p>
          </div>
        )}
        {index === 1 && (
          <div className="flex flex-col gap-2 items-center">
            <Image src="/local.svg" width={55} height={55} alt="local" />
            <h2 className="text-[18px] sm:text-[28px] lg:text-[36px] font-[600] ">
              Local
            </h2>
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[400]">
              1-289-271-9767
            </p>
          </div>
        )}
        {index === 2 && (
          <div className="flex flex-col gap-2 items-center">
            <Image src="/fax.svg" width={55} height={55} alt="fax" />
            <h2 className="text-[18px] sm:text-[28px] lg:text-[36px] font-[600] ">
              Fax
            </h2>
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[400]">
              1-888-908-6056
            </p>
          </div>
        )}
      </div>
      <div className="w-[78%] mx-auto mt-3">
        <div className=" flex justify-end">
          <button
            onClick={() => setIndex(0)}
            className="text-[#9B9B9B] text-[18px] font-[500] px-2"
          >
            01
          </button>
          <button
            onClick={() => setIndex(1)}
            className="text-[#9B9B9B] text-[18px] font-[500] px-2"
          >
            02
          </button>
          <button
            onClick={() => setIndex(2)}
            className="text-[#9B9B9B] text-[18px] font-[500] px-2"
          >
            03
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
