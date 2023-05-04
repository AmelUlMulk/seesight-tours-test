import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface IProps {
  title: string;
  snippet: string;
  media: any;
}

export const Adventure = ({ title, snippet, media }: IProps): JSX.Element => {
  const AdventureSection = styled.div`
    height: 50vh;
    position: relative;
    &:before {
      background: black;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
      opacity: 0;
    }
    display: flex;
    .PageHero_container {
      position: absolute;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      z-index: 1;
      h1 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
      }
      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
      }
    }
  `;
  const StyledImage = styled(Image)`
    z-index: 0;
  `;
  return (
    <>
      <section className="Hero_Section opacity-80 ">
        <AdventureSection className="AdventureSection bg-no-repeat bg-cover bg-center flex justify-start items-center">
          <StyledImage alt="guidesImage" src={media} layout="fill" />
          <div className="PageHero_container flex flex-col pl-10 pb-16 ">
            <div className="font-bold text-white  text-center 3xl:text-[66px] 2xl:text-[66px] xl:text-[55px] lg:text-[55px] md:text-[44px] sm:text-[44px] xsm:text-[33px] ">
              <h2>{title}</h2>
            </div>
            <div className="text-2xl text-white text-center 3xl:text-[28px] 2xl:text-[28px] xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[20px] xsm:text-[18px] ">
              <p>{snippet}</p>
            </div>
            <form>
              <div className=" flex items-stretch mt-5 justify-center">
                <input
                  className="bg-gray-100 rounded-xl rounded-r-none text-base leading-none text-gray-800 p-3 3xl:w-[30%] 2xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[40%] sm:w-[40%] border border-transparent focus:outline-none focus:border-gray-500"
                  placeholder="Search city"
                  name="Search city"
                  required
                  type="email"
                  maxLength={50}
                  minLength={2}
                />
                <button
                  className="disabled:bg-red-400 w-32 cursor-pointer rounded-lg rounded-l-none bg-red-500 text-base font-medium leading-none text-white p-5 uppercase hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </AdventureSection>
      </section>
    </>
  );
};
