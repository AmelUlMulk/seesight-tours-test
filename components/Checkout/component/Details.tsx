import React from 'react';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';
import UserForm from './UserForm';
import { Detail } from 'react-calendar';

interface Details {
  next: () => void;
}
const Details = ({ next }: Details) => {
  return (
    <SectionWrapper title="Traveler Information">
      <div className="flex gap-10">
        <Summary />
        <UserForm next={next} />
      </div>
    </SectionWrapper>
  );
};

export default Details;
