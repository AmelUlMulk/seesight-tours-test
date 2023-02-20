import { SetStateAction, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'react-moment';
interface IProps {
  selectedDate: any;
  setSelectedDate: React.Dispatch<SetStateAction<Date>>;
  dispCalendar: boolean;
  setDispCalendar: React.Dispatch<SetStateAction<boolean>>;
}
const CalendarDate = ({
  selectedDate,
  setSelectedDate,
  dispCalendar,
  setDispCalendar
}: IProps) => {
  const handleCalendarChange = (date: Date) => {
    setSelectedDate(date);
    setDispCalendar(!dispCalendar);
  };
  return (
    <div className="absolute top-[100%] left-0 px-5 w-[100%] z-50">
      <Calendar onChange={handleCalendarChange} value={new Date()} />
    </div>
  );
};

export default CalendarDate;
