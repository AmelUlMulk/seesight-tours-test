import Image from 'next/image';
import { SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from 'react-calendar';

import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
import { useMediaQuery } from '../../layouts/NavBar';

const CalendarStyle = styled(Calendar)`
  width: 100%;
  border-radius: 10px;
  background-color: #eeeeee;
  @media (max-width: 370px) {
    .react-calendar__month-view__weekdays__weekday {
      font-size: 9px;
    }
    .react-calendar__navigation button {
      min-width: 38px;
    }
    button {
      font-size: 12px;
    }
  }
`;
interface IProps {
  selectedDate: any;
  setSelectedDate: React.Dispatch<SetStateAction<any>>;
  dispCalendar: boolean;
  setDispCalendar: React.Dispatch<SetStateAction<boolean>>;
  setCityDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  cityDropdownToggle: boolean;
  tourDropdownToggle: boolean;
  setTourDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
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
  cityDropdownToggle,
  setCityDropdownToggle,
  tourDropdownToggle,
  setTourDropdownToggle,
  submitReview,
  setSubmitReview,
  errorStates,
  setErrorStates,
  errorObject,
  setErrorObject
}: IProps) => {
  const mediaQuery = useMediaQuery(768);
  useEffect(() => {
    setDispCalendar(false);
    if (selectedDate) {
      setSubmitReview(prevstate => {
        return {
          ...prevstate,
          date: selectedDate
        };
      });
    }
  }, [selectedDate]);
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
    <div
      className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center sm:px-3 py-3 rounded-[5px] lg:rounded-[10px] mt-3 hover:cursor-pointer"
      onClick={e => {
        e.stopPropagation();
        setCityDropdownToggle(false);
        setTourDropdownToggle(false);
        setDispCalendar(!dispCalendar);
      }}
    >
      <div className="flex justify-center items-center ">
        <span className="px-3">
          <Image
            src={'/calendar.svg'}
            width={mediaQuery ? 16 : 20}
            height={mediaQuery ? 16 : 20}
            alt="calendar image"
          />
        </span>
        <span className="text-[10px] xsm:text-[12px] sm:text-[14px] xl:text-[16px] font-[500] text-[#333333]">
          {selectedDate
            ? moment(selectedDate).format('MMM Do YYYY')
            : 'When Did You Go?'}
        </span>
      </div>
      <div className="px-3">
        <DropdownIcon />
      </div>
      {dispCalendar && (
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="absolute top-[100%] left-0 w-[100%] z-50"
        >
          <CalendarStyle
            value={selectedDate || new Date()}
            onClickDay={value => handleCalendarChange(value)}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelect;
