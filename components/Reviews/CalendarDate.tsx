import { SetStateAction, useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';

interface IProps {
  selectedDate: any;
  setSelectedDate: React.Dispatch<SetStateAction<any>>;
  dispCalendar: boolean;
  setDispCalendar: React.Dispatch<SetStateAction<boolean>>;
  submitReview: Record<string, unknown>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, unknown>>>;
}

const CalendarDate = ({
  selectedDate,
  setSelectedDate,
  dispCalendar,
  setDispCalendar,
  submitReview,
  setSubmitReview
}: IProps) => {
  const handleCalendarChange = (date: any) => {
    setSelectedDate(date);
  };

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

  return (
    <div className="absolute top-[100%] left-0 px-5 w-[100%] z-50">
      <Calendar
        value={selectedDate || new Date()}
        onClickDay={value => handleCalendarChange(value)}
      />
    </div>
  );
};

export default CalendarDate;
