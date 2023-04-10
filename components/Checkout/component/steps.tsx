import React from 'react';
import styled from 'styled-components';
const Line = styled.div`
  position: absolute;
  height: 1px;
  border-bottom: 1px solid white;
  bottom: 50%;
  width: 100%;
  z-index: 1;
`;
interface StepProps {
  selected: boolean;
  currentIndex: number;
  index: number;
}

const Step = styled.div<StepProps>`
  width: ${props => (props.selected ? '150px' : '90px')};
  /* height: ${props => (props.selected ? '150px' : '80px')}; */
  padding: 0rem 1rem;
  @media (max-width: 1200px) {
    width: ${props => (props.selected ? '90px' : '80px')};
    /* height: ${props => (props.selected ? '90px' : '50px')}; */
    font-size: ${props => (props.selected ? '24px' : '17px')};
  }
  display: flex;
  transition: all 0.2s ease-in-out;
  color: ${props =>
    props.currentIndex > props.index
      ? 'green'
      : props.selected
      ? '#fb923c'
      : '#8B8B8B'};

  justify-content: center;
  align-items: center;
  font-size: ${props => (props.selected ? '24px' : '17px')};
  z-index: 1;

  background: white;
  /* border: ${props => (props.selected ? '2px solid #ad2025' : '')}; */
`;

type StepsProp = {
  currentStepIndex: number;
};
//Comparing stating with zero bacause step 1 = [0]
const Steps = ({ currentStepIndex = 0 }: StepsProp) => {
  return (
    <div className="w-full flex justify-center ">
      <div className="w-5/6 lg:w-1/2 flex justify-center relative bg-white   rounded-lg my-4  py-4">
        <div className="relative w-4/5 md:w-1/2 lg-1/4  flex  align-middle justify-between items-center z-[100]">
          <Line />
          <Step
            selected={currentStepIndex === 0 ? true : false}
            currentIndex={currentStepIndex}
            index={0}
          >
            {' '}
            <h1>Date</h1>
          </Step>
          <Step
            selected={currentStepIndex === 1 ? true : false}
            currentIndex={currentStepIndex}
            index={1}
          >
            <h1>Payment</h1>
          </Step>
          <Step
            selected={currentStepIndex === 2 ? true : false}
            currentIndex={currentStepIndex}
            index={2}
          >
            <h1>Confirm</h1>
          </Step>
        </div>
      </div>
    </div>
  );
};

export default Steps;
