import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface StepProps {
  selected: boolean;
  currentIndex: number;
  index: number;
}
interface LINEPROS {
  selected: boolean;
}
const Line = styled.div<LINEPROS>`
  position: relative;
  margin: 0rem 0.4rem;
  border-bottom: ${props =>
    props.selected ? '4px solid #2191FA' : '4px solid gray'};
  width: 20%;
  z-index: 1;
`;

const Step = styled.div<StepProps>`
  justify-items: center;
  /* width: ${props => (props.selected ? '150px' : '90px')}; */
  /* height: ${props => (props.selected ? '150px' : '80px')}; */
  /* padding: 0rem 1rem; */
  /* @media (max-width: 1200px) { */
  /* width: ${props => (props.selected ? '90px' : '80px')}; */
  /* height: ${props => (props.selected ? '90px' : '50px')}; */
  /*   font-size: ${props => (props.selected ? '24px' : '17px')};
  } */
  /* @media (max-width: 768px) {
    width: ${props => (props.selected ? '80px' : '70px')};
    /* height: ${props => (props.selected ? '90px' : '50px')}; */
  /* font-size: ${props => (props.selected ? '21px' : '16px')}; */
  /* } */
  display: flex;
  transition: all 0.2s ease-in-out;
  background-color: white;
  gap: 0.5rem;
  h1 {
    background: white;
  }
  justify-content: center;
  align-items: center;
  z-index: 1;
  .progress {
    border: 1px solid #f15c5a;
  }
`;

type StepsProp = {
  currentStepIndex: number;
};
//Comparing stating with zero bacause step 1 = [0]
const Steps = ({ currentStepIndex = 0 }: StepsProp) => {
  return (
    <div className="w-full flex justify-center ">
      <div className="  w-11/12   md:w-5/6   md:justify-center flex justify-start  relative bg-white   rounded-lg my-4  py-4">
        <div className="relative w-full md:w-1/2 lg-1/4  flex  align-middle justify-between items-center z-[100]  ">
          <Step
            selected={currentStepIndex === 0 ? true : false}
            currentIndex={currentStepIndex}
            index={0}
          >
            <div className=" progress rounded-full w-8 h-8  flex items-center justify-center  text-[#F15C5A]   ">
              1
            </div>
            {/* {currentStepIndex > 0 && (
              <Image src="/check.png" width={20} height={20} alt="check icon" />
            )} */}
            <h1>Date</h1>
          </Step>
          <Line selected={currentStepIndex === 1} />

          <Step
            selected={currentStepIndex === 1 ? true : false}
            currentIndex={currentStepIndex}
            index={1}
          >
            <div className=" progress rounded-full w-8 h-8  flex items-center justify-center  text-[#F15C5A]   ">
              2
            </div>
            <h1>Payment</h1>
          </Step>
          <Line selected={currentStepIndex === 2} />
          <Step
            selected={currentStepIndex === 2 ? true : false}
            currentIndex={currentStepIndex}
            index={2}
          >
            <div className=" progress rounded-full w-8 h-8  flex items-center justify-center  text-[#F15C5A]   ">
              3
            </div>
            <h1>Confirm</h1>
          </Step>
        </div>
      </div>
    </div>
  );
};

export default Steps;
