import Image from 'next/image';
import { SetStateAction, useEffect } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';

import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';

interface IProps {
  selectedDate: any;
  setSelectedDate: React.Dispatch<SetStateAction<any>>;
  dispCalendar: boolean;
  setDispCalendar: React.Dispatch<SetStateAction<boolean>>;
  submitReview: Record<string, unknown>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, unknown>>>;
  errorStates: Record<string, boolean>;
  setErrorStates: React.Dispatch<SetStateAction<Record<string, boolean>>>;
  errorObject: Record<string, unknown>;
  setErrorObject: React.Dispatch<SetStateAction<Record<string, unknown>>>;
}

const DateSelect = ({
  selectedDate,
  setSelectedDate,
  dispCalendar,
  setDispCalendar,
  submitReview,
  setSubmitReview,
  errorStates,
  setErrorStates,
  errorObject,
  setErrorObject
}: IProps) => {
  useEffect(() => {
    if (selectedDate) {
      setSubmitReview(prevstate => {
        return {
          ...prevstate,
          date: selectedDate
        };
      });
    }
  }, [selectedDate, setSubmitReview]);
  const handleCalendarChange = (date: any) => {
    setSelectedDate(date);
    if (errorObject.date) {
      const obj = { ...errorObject };
      delete obj.date;
      // delete obj.cities;
      setErrorObject(obj);
    }
  };

  return (
    <button
      className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
      onClick={() => setDispCalendar(!dispCalendar)}
    >
      <div className="flex justify-center items-center pr-[11rem]">
        <span className="px-3">
          <Image
            src={'/calendar.svg'}
            width={33}
            height={33}
            alt="calendar image"
          />
        </span>
        <span>
          {selectedDate
            ? moment(selectedDate).format('MMM Do YYYY')
            : 'When did you go?'}
        </span>
      </div>
      <div>
        <DropdownIcon />
      </div>
      {dispCalendar && (
        <div className="absolute top-[100%] left-0 px-5 w-[100%] z-50">
          <Calendar
            value={selectedDate || new Date()}
            onClickDay={value => handleCalendarChange(value)}
          />
        </div>
      )}
    </button>
  );
};

export default DateSelect;
