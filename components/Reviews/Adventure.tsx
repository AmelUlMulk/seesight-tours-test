import Image from 'next/image';
import styled from 'styled-components';
import PageHero from '../../layouts/PageHero';
import SearchCity from '../Searchbar/searchCity';

const AdventureStyle = styled.div`
  background-image: url('/review_adventure.png');
`;
const Adventure = () => {
  return (
    <AdventureStyle className="bg-no-repeat bg-cover bg-center h-[35vh] md:h-[45vh] flex flex-col justify-center items-center mt-5">
      <div className="text-white text-center max-w-[88%]">
        <h1 className=" text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[56px] 2xl:text-[66px] font-[400] ">
          Ready for an adventure?
        </h1>
        <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[25px] 2xl:text-[28px] font-[400]">
          The best small group tours operating across Canada and the United
          States
        </p>
      </div>
      <div className="relative my-10 w-[100%]">
        <SearchCity />
      </div>
    </AdventureStyle>
  );
};

export default Adventure;
