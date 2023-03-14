import { useEffect, useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  AVAILABILITY,
  PASSENGERPAX,
  PASSENGERINFO
} from '../../pages/checkout/[slug]';
import Summary from './component/summary';

const StyledCelendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  @media (max-width: 765px) {
    width: 100%;
  }
  max-height: 55vh;

  overflow: hidden;
  button:disabled {
    background: gray;
  }
  background: #131313;
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
    background: #ad2025;
    .react-calendar__navigation__label {
    }
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
    width: 100%;
    .react-calendar__navigation__label {
      flex: 0;
    }
  }
`;
interface DayContainerProps {
  active: boolean;
}
const DayContainer = styled.div<DayContainerProps>`
  background: ${props => (props.active ? 'white' : 'transparent')};
  color: ${props => (props.active ? 'black' : 'white')};
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;
const TimeOptions = styled.div`
  background: #131313;
  display: flex;
  min-width: 49%;
  padding: 1rem;
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

  // console.log('passengerPAX', passengerPax);
  // console.log('filterPAX', selectedPaxObj);
  // console.log('selectedTimeSlot:', selectedTimeSlot);
  // console.log('totalPrice', totalPrice);
  return (
    <div className="md:flex w-[90%] lg:w-[80%] m-auto relative z-30">
      <section id="availibilty" className="flex-none md:w-[50%] px-5">
        <StyledCelendar
          tileContent={({ activeStartDate, date, view }) => (
            <DayContainer
              active={
                selectedDate === dayjs(date).format('YYYY-MM-DD') ? true : false
              }
            >
              <p className="text-[14px] md:text-[16px] xl:text-[20px] font-[400]">
                {date.getDate()}
              </p>
              <p className=" text-[12px] xsm:text-[16px] xl:text-[20px] font-[500] sm:font-[700] ">
                {priceCheck(date)}
              </p>
            </DayContainer>
          )}
          onClickDay={value => {
            setSelectedDate(dayjs(value).format('YYYY-MM-DD'));
          }}
          tileDisabled={({ activeStartDate, date, view }) => {
            if (availabilityArray.includes(dayjs(date).format('YYYY-MM-DD'))) {
              return false;
            }
            return true;
          }}
        />
      </section>
      <section
        id="passenger_qty"
        className="flex-none md:w-[50%] mt-5 md:mt-0 px-5"
      >
        <div className="flex flex-col">
          <div id="selected_date" className="text-white bg-black">
            <div className="flex flex-col sm:w-full ">
              <div className=" flex flex-wrap w-full gap-2 bg-[#131313]">
                {availability.map(item => (
                  <TimeOptions key={item.startTime}>
                    <input
                      type="checkbox"
                      className=" w-4 mr-2  "
                      onClick={() => setSelectedTimeSlot(item)}
                      checked={item.id === selectedTimeSlot.id}
                    />

                    <span className="text-lg text-white">
                      {dayjs(item.startTime).format(' MMM-DD-YYYY , HH:mm A')}
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
                    {selectedPaxObj?.map((item: Record<string, any>) => {
                      const key = Object.keys(item)[0];
                      return (
                        <p key={item.label}>{`${
                          key[0].toUpperCase() + key.slice(1)
                        }-X${item[key].count}`}</p>
                      );
                    })}
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
                    .map((key: string) => {
                      return (
                        <div
                          key={key}
                          className="flex justify-between items-start xsm:py-2 sm:py-0"
                        >
                          <div>
                            <p className="text-[12px] sm:text-[16px] xl:text-[20px] font-[600] ">
                              {key[0].toLocaleUpperCase() + key.slice(1)}
                            </p>
                            <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-[400]">
                              {ageLimit(key)}
                            </p>
                          </div>
                          <p className="text-[12px] sm:text-[14px] xl:text-[18px] font-[600]">
                            {/* @ts-ignore */}$
                            {passengerPax[key as keyof PASSENGERPAX]?.price}
                          </p>
                          <div className="flex justify-between items-center">
                            <button
                              id="minus"
                              name={key}
                              className="border border-slate-400 w-6 h-6 xsm:w-8 xsm:h-8  sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full hover:bg-red-500 hover:text-white hover:border-none"
                              onClick={e => updatePassengerPAX(e)}
                            >
                              -
                            </button>
                            <p className="px-3 sm:px-10 md:px-5 lg:px-8 xl:px-12">
                              {/* @ts-ignore */}
                              {passengerPax[key as keyof PASSENGERPAX]?.count}
                            </p>
                            <button
                              id="plus"
                              name={key}
                              className="border border-slate-400 w-6 h-6  xsm:w-8 xsm:h-8  sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full hover:bg-green-500 hover:text-white hover:border-none"
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
          <Summary passengerPax={passengerPax} totalPrice={totalPrice} />
        </div>
      </section>
    </div>
  );
};

export default DateAndPax;
