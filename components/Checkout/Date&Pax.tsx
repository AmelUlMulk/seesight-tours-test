import { useEffect, useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  AVAILABILITY,
  PASSENGERPAX,
  PASSENGERINFO
} from '../../pages/checkout';
import Summary from './component/summary';
import SectionWrapper from './component/SectionWrapper';

const StyledCelendar = styled(Calendar)`
  width: 100%;
  margin-bottom: 3rem;
  @media (max-width: 1212px) {
    min-width: 100%;
  }
  height: 100%;
  @media (max-width: 765px) {
    min-width: 100%;
  }
  .react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation__prev2-button {
    display: none;
  }
  max-height: 55vh;
  .react-calendar__tile--active {
    background-color: white !important;
  }
  .react-calendar__tile {
    padding: 0;
  }
  .react-calendar__century-view__decades__decade {
    div {
      display: none;
      padding: 1.4rem;
    }
  }
  .react-calendar__year-view__months__month {
    abbr {
      color: black;
    }

    padding: 1.4rem !important;
    div {
      display: none;
    }
    p {
      display: none !important;
    }
  }
  .react-calendar__tile--now {
    background-color: white;
  }
  overflow: hidden;
  button:disabled {
    background: gray;
    opacity: 0.5;
    min-height: 57px;
    width: 100%;
  }
  .react-calendar__month-view__days {
    background: white !important;
  }
  background: white;
  border-radius: 5px;
  abbr {
    color: white;
    text-decoration: none;
  }
  .react-calendar__navigation {
    padding: 0.5rem;
    display: flex;
    color: white;
    font-size: 1.5rem;
    justify-content: center;
    gap: 1rem;
    background: #f15c5a;
  }
  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: center;
    @media (max-width: 370px) {
      gap: 0.2rem;
    }
    gap: 0.3rem;
  }
  .react-calendar__month-view__days__day {
    abbr {
      display: none;
    }
    button:disabled {
      background: red;
    }
    padding: none;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    display: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    display: flex;

    justify-content: center;
    border-radius: 5px;
    flex: 0 0 13.2857% !important;
    font-size: 22px;
    padding: 0.5rem;
    font-size: 1.2rem;
    @media (max-width: 1280px) {
      font-size: 20px;
      padding: 0.3rem;
      gap: 0.2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.1rem;
      gap: 0.2rem;
    }
    @media (max-width: 370px) {
      font-size: 0.9rem;
      gap: 0rem !important;
    }
    gap: 1rem;
    background: white;
    abbr {
      color: #131313 !important;
    }
  }
  .react-calendar__month-view__days {
    align-items: center;
    abbr {
    }
  }
  .react-calendar__month-view__days {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .react-calendar__viewContainer {
    height: 100%;
    width: 100%;
  }
  .react-calendar__navigation {
    display: flex !important;
    justify-content: center;

    :hover {
      background: #ad2025;
    }
    .react-calendar__navigation__arrow {
      :hover {
        background: #ad2025;
      }
      &:active {
        background: #ad2025;
      }
    }
    width: 100%;
    .react-calendar__navigation__label {
      flex: 0;
      :hover {
        background: #ad2025;
      }
    }
  }
`;
interface DayContainerProps {
  active: boolean;
}
const DayContainer = styled.div<DayContainerProps>`
  background: ${props => (props.active ? '#F15C5A' : 'transparent')};
  color: ${props => (props.active ? 'white' : 'black')};
  display: flex;
  .date {
    color: ${props => (!props.active ? '#F15C5A' : 'white')};
  }
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  padding-top: 0.5rem;
  border: 0.4px solid gray;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 0.2rem;
  }
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
const TimeOptions = styled.div`
  background: #eeeeee;
  display: flex;
  min-width: 170px;
  border-radius: 0.5rem;
  color: black;
  padding: 0.7rem 1rem;
  justify-content: space-between;
`;
interface DATEANDPAXPROPS {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  availability: AVAILABILITY[];
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<AVAILABILITY>>;
  selectedTimeSlot: AVAILABILITY;
  productAvailabities: AVAILABILITY[];
  passengerPax: PASSENGERPAX;
  setPassengerPax: React.Dispatch<React.SetStateAction<PASSENGERPAX>>;
  totalPrice: number;
  slug: string;
  name: string;
}

const DateAndPax = ({
  selectedDate,
  setSelectedDate,
  availability,
  selectedTimeSlot,
  setSelectedTimeSlot,
  productAvailabities,
  passengerPax,
  setPassengerPax,
  totalPrice,
  slug,
  name
}: DATEANDPAXPROPS) => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileCalendar, setMobileCalendar] = useState<boolean>(true);
  const [availabilityArray] = useState(() =>
    productAvailabities.map(item => dayjs(item.startTime).format('YYYY-MM-DD'))
  );
  const [seatsFull, setSeatsFull] = useState<boolean>(false);
  useEffect(() => {
    const childrens = passengerPax.children?.count || 0;
    const infants = passengerPax.infants?.count || 0;
    const totalPax = passengerPax.adults.count + childrens + infants;

    if (totalPax >= passengerPax.seats) {
      setSeatsFull(true);
      return;
    }
    setSeatsFull(false);
  }, [passengerPax]);
  const priceCheck = (date: Date): string => {
    const price = productAvailabities.filter(
      item =>
        dayjs(item.startTime).format('YYYY-MM-DD') ===
        dayjs(date).format('YYYY-MM-DD')
    )[0]?.prices[0].price;

    if (price) {
      return `$${price}`;
    }
    return '';
  };
  const ageLimit = (key: string) => {
    if (key === 'adults') {
      return 'Ages 13+';
    } else if (key === 'children') {
      return 'Ages 5-12';
    } else {
      return 'Ages 0-5';
    }
  };
  const updatePassengerPAX = (e: any) => {
    const key = e.target.name as keyof PASSENGERPAX;
    if (!seatsFull) {
      if (e.target.id === 'plus') {
        setPassengerPax({
          ...passengerPax,
          [key]: {
            ...(passengerPax[key] as PASSENGERINFO),
            count: (passengerPax[key] as PASSENGERINFO).count + 1
          }
        });
      }
    }
    if (e.target.id === 'minus') {
      if ((passengerPax[key] as PASSENGERINFO).count === 0) {
        return;
      }
      setPassengerPax({
        ...passengerPax,
        [key]: {
          ...(passengerPax[key] as PASSENGERINFO),
          count: (passengerPax[key] as PASSENGERINFO).count - 1
        }
      });
    }
  };
  const selectedPaxObj = Object.entries(passengerPax)
    //@ts-ignore
    .filter(([key, value]) => value.count > 0)
    .map(([key, value]) => ({ [key]: value }));

  return (
    <SectionWrapper title="Select Date & no of Person" slug={slug} name={name}>
      <div className="md:flex w-[90%] lg:w-[100%] m-auto relative gap-8  z-30">
        <section
          id="availibilty"
          className="flex justify-end md:w-[50%] items-start"
        >
          <div className="flex-col  w-full   ">
            <div className="flex w-full bg-white md:hidden items-center py-3 px-2 rounded  justify-between ">
              Tour Date :
              <span className=" flex-1 px-4 font-bold ">
                {' '}
                {dayjs(selectedDate).format('DD MMM YYYY')}{' '}
              </span>
              <div
                className={`rotate-180 ${mobileCalendar && 'rotate-0'}  `}
                onClick={() => setMobileCalendar(!mobileCalendar)}
              >
                <Image
                  src="/dropDown.png"
                  width={10}
                  height={10}
                  alt="dropdown"
                />
              </div>
            </div>
            {mobileCalendar && (
              <StyledCelendar
                tileContent={({ activeStartDate, date, view }) => (
                  <DayContainer
                    active={
                      selectedDate === dayjs(date).format('YYYY-MM-DD')
                        ? true
                        : false
                    }
                  >
                    <p>{date.getDate()}</p>
                    <p className=" date text-sm md:text-lg ">
                      {priceCheck(date)}
                    </p>
                  </DayContainer>
                )}
                onClickDay={value => {
                  setSelectedDate(dayjs(value).format('YYYY-MM-DD'));
                  if (
                    window.matchMedia('screen and (max-width: 767px)').matches
                  ) {
                    setMobileCalendar(!mobileCalendar);
                  }
                }}
                tileDisabled={({ activeStartDate, date, view }) => {
                  if (
                    availabilityArray.includes(dayjs(date).format('YYYY-MM-DD'))
                  ) {
                    return false;
                  }
                  return true;
                }}
              />
            )}
          </div>
        </section>
        <section
          id="passenger_qty"
          className="flex-none md:w-[50%] mt-5 md:mt-0 "
        >
          <div className="flex flex-col justify-center ">
            <div id="selected_date" className="text-white ">
              <div className="flex flex-col sm:w-full ">
                <div className=" flex flex-wrap w-full gap-2 justify-between bg-white  p-2 ">
                  {availability.map((item: any, index: number) => (
                    <TimeOptions key={item.startTime}>
                      <input
                        type="checkbox"
                        className=" w-4 mr-2  "
                        onClick={() => setSelectedTimeSlot(item)}
                        checked={item.id === selectedTimeSlot.id}
                      />

                      <span className=" text-base md:text-lg text-black">
                        {dayjs(item.startTime).format(' HH:mm A')}
                      </span>
                    </TimeOptions>
                  ))}
                </div>
              </div>
            </div>
            <div id="update_pax" className="bg-white flex flex-col">
              <div className="flex justify-between items-center px-5 py-2">
                <div>
                  {selectedPaxObj && selectedPaxObj.length > 0 && (
                    <div className="flex">
                      {selectedPaxObj?.map(
                        (item: Record<string, any>, index) => {
                          const key = Object.keys(item)[0];
                          return (
                            <p key={item.label}>{`${
                              key[0].toUpperCase() + key.slice(1)
                            } x ${item[key].count} ${
                              index <= 1 ? ',' : ''
                            } `}</p>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={`rotate-180 ${isOpen && 'rotate-0'}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Image
                    src="/dropDown.png"
                    width={10}
                    height={10}
                    alt="dropdown"
                  />
                </div>
              </div>
              {isOpen && (
                <>
                  {seatsFull && (
                    <div className="text-red-400">Seats are full</div>
                  )}
                  <div className="py-2 px-6 sm:px-10 md:px-5 xl:px-10">
                    {Object.keys(passengerPax)
                      .slice(0, -1)
                      .map((key: string, index: number) => {
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-6  xsm:py-2 sm:py-0 items-center"
                          >
                            <div className=" col-span-1 ">
                              <p className=" sm:text-[16px ] lg:text-[17px]    ">
                                {key[0].toLocaleUpperCase() + key.slice(1)}
                              </p>
                              <p className=" text-[12px] lg:text-[14px] ">
                                {ageLimit(key)}
                              </p>
                            </div>
                            <p className=" text-center col-span-2 2xl:col-span-3 sm:text-[14px] xl:text-[17px]   ">
                              {/* @ts-ignore */}$
                              {passengerPax[key as keyof PASSENGERPAX]?.price}
                            </p>
                            <div className=" grid grid-cols-3   col-span-3 2xl: xl:col-span-2 items-center justify-center ">
                              <button
                                id="minus"
                                name={key}
                                className=" justify-self-center  border border-slate-400 w-6 h-6 xsm:w-8 xsm:h-8  sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full hover:bg-red-500 hover:text-white hover:border-none"
                                onClick={e => updatePassengerPAX(e)}
                              >
                                -
                              </button>
                              <p className=" col-span-1 text-center">
                                {/* @ts-ignore */}
                                {passengerPax[key as keyof PASSENGERPAX]?.count}
                              </p>
                              <button
                                id="plus"
                                name={key}
                                className="border justify-self-center border-slate-400 w-6 h-6  xsm:w-8 xsm:h-8  sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full hover:bg-green-500 hover:text-white hover:border-none"
                                onClick={e => updatePassengerPAX(e)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
            {/* <Summary passengerPax={passengerPax} totalPrice={totalPrice} /> */}
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
};

export default DateAndPax;
