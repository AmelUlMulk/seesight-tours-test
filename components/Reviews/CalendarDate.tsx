import { SetStateAction, useEffect, useState } from 'react';
import Calendar from 'react-calendar';

interface IProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<SetStateAction<Date | null>>;
  dispCalendar: boolean;
  setDispCalendar: React.Dispatch<SetStateAction<boolean>>;
}

const CalendarDate = ({
  selectedDate,
  setSelectedDate,
  dispCalendar,
  setDispCalendar
}: IProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const handleCalendarChange = (date: any) => {
    setSelectedDate(date);
    setDispCalendar(!dispCalendar);
  };

  return (
    <div className="absolute top-[100%] left-0 px-5 w-[100%] z-50">
      <Calendar
        value={date}
        onClickDay={value => handleCalendarChange(value)}
      />
    </div>
  );
};

export default CalendarDate;
