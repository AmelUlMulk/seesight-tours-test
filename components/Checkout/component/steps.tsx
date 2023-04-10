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
}

const Step = styled.div<StepProps>`
  width: ${props => (props.selected ? '120px' : '80px')};
  height: ${props => (props.selected ? '120px' : '80px')};
  @media (max-width: 1200px) {
    width: ${props => (props.selected ? '90px' : '50px')};
    height: ${props => (props.selected ? '90px' : '50px')};
    font-size: ${props => (props.selected ? '40px' : '20px')};
  }
  display: flex;
  transition: all 0.2s ease-in-out;
  color: ${props => (props.selected ? 'black' : '#8B8B8B')};
  justify-content: center;
  align-items: center;
  font-size: ${props => (props.selected ? '60px' : '30px')};
  z-index: 1;
  border-radius: 50%;
  background: ${props => (props.selected ? 'white' : '#B0B0B0')};
  border: ${props =>
    props.selected ? '2px solid #ad2025' : '1px solid #ad2025'};
`;

type StepsProp = {
  currentStepIndex: number;
};
//Comparing stating with zero bacause step 1 = [0]
const Steps = ({ currentStepIndex = 0 }: StepsProp) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-4/5 md:w-1/2 lg-1/4  flex  align-middle justify-between items-center z-[100]">
        <Line />
        <Step selected={currentStepIndex === 0 ? true : false}>
          <h1>1</h1>
        </Step>
        <Step selected={currentStepIndex === 1 ? true : false}>
          <h1>2</h1>
        </Step>
        <Step selected={currentStepIndex === 2 ? true : false}>
          <h1>3</h1>
        </Step>
      </div>
    </div>
  );
};

export default Steps;
