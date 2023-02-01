import React from 'react';
import styled from 'styled-components';
import VectorThree from '../../assets/svg/Reviews.svg';
import VectorTwo from '../../assets/svg/Cancel.svg';
import VectorOne from '../../assets/svg/People.svg';
import Link from 'next/link';

const HeaderCards = styled.div`
  background-color: #2191fa;
  height: 90px;
  left: 131px;
  top: 627px;
  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;

    line-height: 2rem;
    padding-top: 28px;
  }
`;
//3xl:px-20 lg:px-12 md:px-12 sm:px-12  xsm:px-10 xxsm:px-8
export const TrustBar = () => {
  return (
    <div className="grid  grid-cols-3 gap-10 xsm:gap-3 xxsm:gap-2 xl:gap-7 mt-10 3xl:gap-5 xxsm:grid-cols-1 xsm:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3   3xl:px-72 2xl:px-72  xl:px-64 lg:px-28 md:px-20  sm:px-10 xsm:px-5 xxsm:px-2  ">
      <Link href="/tours">
        <HeaderCards className=" h-auto bg-blue-500 xl:px-5 rounded-2xl flex text-white gap-5  items-stretch  justify-center ">
          <div className="py-7">
            <VectorOne />
          </div>
          <div>
            <p className="3xl:text-[24px] 2xl:text-[23px] xl:text-[23px] lg:text-[22px] xsm:text-[22px] xxsm:text-[22px]  ">
              Small-Group Tours
            </p>
          </div>
        </HeaderCards>
      </Link>
      <HeaderCards className="h-auto bg-blue-500 xl:px-5 rounded-2xl flex text-white gap-5  items-stretch  justify-center  ">
        <div className="py-6">
          <VectorTwo />
        </div>
        <div>
          <p className="3xl:text-[24px] 2xl:text-[23px] xl:text-[23px] lg:text-[22px] xsm:text-[22px] xxsm:text-[22px] ">
            Free Cancellation
          </p>
        </div>
      </HeaderCards>
      <Link href="/reviews">
        <HeaderCards className="h-auto bg-blue-500 xl:px-5 rounded-2xl flex text-white gap-5  items-stretch  justify-center  ">
          <div className="py-5">
            <VectorThree />
          </div>
          <div>
            <p className="3xl:text-[24px] 2xl:text-[23px] xl:text-[23px] lg:text-[22px] xsm:text-[22px] xxsm:text-[22px]  ">
              5000+ 5-Star Reviews
            </p>
          </div>
        </HeaderCards>
      </Link>
    </div>
  );
};
