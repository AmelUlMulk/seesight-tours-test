import React, { useContext, useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Image from 'next/image';
import axios from 'axios';
import { fetchProductAvailabilities } from '../../utils/getProductAvailabilites';
import { useRouter } from 'next/router';
import { PaxContext } from '../../utils/checkoutContext';

type PASSENGERINFO = {
  count: number;
  label: string;
  title: string;
  price: string;
};

export type AVAILABILITY = {
  id: number;
  startTime: string;
  endTime: string;
  allDay: boolean;
  seats: number;
  seatsAvailable: 150;
  prices: PASSENGERINFO[];
};
type axiosReturn = {
  data: [
    {
      id: number;
      startTime: string;
      endTime: string;
      allDay: boolean;
      seats: number;
      seatsAvailable: 150;
      prices: PASSENGERINFO[];
    }
  ];
};
export type PASSENGERPAX = {
  adults: PASSENGERINFO;
  children?: PASSENGERINFO;
  infants?: PASSENGERINFO;
  seats: number;
};

const StyledCelendar = styled(Calendar)`
  width: 100%;
  min-height: 380px;
  position: absolute;
  z-index: 100;
  top: 0;
  margin-bottom: 3rem;
  @media (max-width: 1212px) {
    min-width: 100%;
  }
  height: 100%;
  @media (max-width: 765px) {
    min-width: 100%;
  }
  .react-calendar__navigation__label__labelText--from {
    pointer-events: none;
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
      color: red;
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
    text-decoration: line-through;
    background: transparent;
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
    button:enabled:focus {
      background-color: transparent !important;
    }
  }
  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: center;
    @media (max-width: 370px) {
      gap: 0.2rem;
    }
    gap: 3px;
  }
  .react-calendar__month-view__days__day {
    abbr {
      display: none;
    }
    color: black;
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
    font-size: 16px !important;
    padding: 0rem 0.2rem;
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
      font-size: 16px;
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
      pointer-events: none;
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

  .price {
    color: ${props => (props.active ? 'white' : '#6b7280')};
    font-size: 12px;
  }

  display: flex;
  flex-direction: column;
  padding: 2px;
`;
const TimeOptions = styled.div`
  display: flex;
  max-width: 48%;
  min-width: 48%;
  padding: 8px;
  justify-content: space-between;
`;
const PAXSELECTOR = styled.div`
  background: #ffffff;
  border-radius: 0px 15px 0px 0px;
  padding: 10px 47px;
`;

interface DATEANDPAXPROPS {
  rezdyId: string;
  updateTourContext: () => void;
  mobile: boolean;
}

const DateAndPax = ({
  rezdyId,
  updateTourContext,
  mobile
}: DATEANDPAXPROPS) => {
  const [mobileCalendar, setMobileCalendar] = useState<boolean>(false);
  const router = useRouter();
  //@ts-expect-error
  const { updatePax } = useContext(PaxContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [noAvailability, setNoAvailability] = useState<boolean>(false);
  const [productAvailabities, setProductAvailabilites] = useState<
    AVAILABILITY[]
  >([
    {
      id: 1,
      startTime: '2023-04-12',
      endTime: '2023-04-12',
      allDay: false,
      seats: 10,
      seatsAvailable: 150,
      prices: [
        {
          count: 4,
          label: 'Adults',
          title: 'children',
          price: '400'
        }
      ]
    }
  ]);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(productAvailabities[0].startTime).format('YYYY-MM-DD')
  );

  const [isOpen, setIsOpen] = useState(true);

  const [availabilityArray, setAvailabilityArray] = useState(() =>
    productAvailabities.map(item => dayjs(item.startTime).format('YYYY-MM-DD'))
  );

  const [selectedAvailaibility, setSelectedAvailability] = useState<
    AVAILABILITY[]
  >(() =>
    productAvailabities.filter(
      date => dayjs(date.startTime).format('YYYY-MM-DD') === selectedDate
    )
  );

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AVAILABILITY>(
    selectedAvailaibility[0]
  );

  const [passengerPax, setPassengerPax] = useState<PASSENGERPAX>(() => {
    return {
      adults: {
        count: selectedTimeSlot.seatsAvailable > 1 ? 1 : 0,
        label: selectedTimeSlot.prices[0].label,
        price: selectedTimeSlot.prices[0].price,
        title: selectedTimeSlot.prices[0].label
      },
      infants: selectedTimeSlot.prices[1]
        ? {
            count: 0,
            label: selectedTimeSlot.prices[1].label,
            price: selectedTimeSlot.prices[1].price,
            title: selectedTimeSlot.prices[1].label
          }
        : undefined,
      children: selectedTimeSlot.prices[2]
        ? {
            count: 0,
            label: selectedTimeSlot.prices[2].label,
            price: selectedTimeSlot.prices[2].price,
            title: selectedTimeSlot.prices[2].label
          }
        : undefined,
      seats: selectedTimeSlot.seats
    };
  });
  const [totalPrice, setTotalPrice] = useState<number>(() =>
    Number(passengerPax?.adults.price)
  );
  const [seatsFull, setSeatsFull] = useState<boolean>(false);

  useEffect(() => {
    const getDate = async () => {
      setLoading(true);
      const availability = await fetchProductAvailabilities({ rezdyId });
      if (!availability) {
        setNoAvailability(true);
        setLoading(false);
        return;
      }
      if (availability) {
        setLoading(false);
      }
      setSelectedDate(dayjs(availability[0].startTime).format('YYYY-MM-DD'));
      setProductAvailabilites(availability);
      setAvailabilityArray(() => {
        return availability.map(item =>
          dayjs(item.startTime).format('YYYY-MM-DD')
        );
      });
    };
    getDate();
  }, []);

  useEffect(() => {
    setSelectedAvailability(() =>
      productAvailabities.filter(
        date => dayjs(date.startTime).format('YYYY-MM-DD') === selectedDate
      )
    );
  }, [selectedDate, productAvailabities]);

  useEffect(() => {
    setSelectedTimeSlot(selectedAvailaibility[0]);
  }, [selectedAvailaibility]);

  useEffect(() => {
    const adults =
      passengerPax.adults.count * Number(passengerPax.adults.price);
    const children = passengerPax.children
      ? passengerPax.children.count * Number(passengerPax.children.price)
      : 0;
    const infants = passengerPax.infants
      ? passengerPax.infants.count * Number(passengerPax.infants.price)
      : 0;
    setTotalPrice(() => Number(adults + children + infants));
  }, [passengerPax]);

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

  useEffect(() => {
    selectedTimeSlot &&
      setPassengerPax({
        adults: {
          count: selectedTimeSlot.seatsAvailable > 1 ? 1 : 0,
          label: selectedTimeSlot.prices[0].label,
          price: selectedTimeSlot.prices[0].price,
          title: selectedTimeSlot.prices[0].label
        },
        children: selectedTimeSlot.prices[1]
          ? {
              count: 0,
              label: selectedTimeSlot.prices[1].label,
              price: selectedTimeSlot.prices[1].price,
              title: selectedTimeSlot.prices[1].label
            }
          : undefined,
        infants: selectedTimeSlot.prices[2]
          ? {
              count: 0,
              label: selectedTimeSlot.prices[2].label,
              price: selectedTimeSlot.prices[2].price,
              title: selectedTimeSlot.prices[2].label
            }
          : undefined,
        seats: selectedTimeSlot.seatsAvailable
      });
  }, [selectedTimeSlot, productAvailabities]);
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

  const proceedToCheckout = () => {
    updatePax({ ...passengerPax, totalPrice, selectedTimeSlot });
    updateTourContext();
    router.push('/checkout');
  };
  return (
    <div className={`${mobile ? 'block' : 'hidden'} mmd:block `}>
      {loading ? (
        <div className=" flex justify-center items-center w-full h-44 ">
          <p className="text-gray-400 animate-pulse">Loading</p>
        </div>
      ) : noAvailability ? (
        <div className=" flex justify-center items-center w-full h-44 ">
          <p className="text-gray-400 ">Coming Soon</p>
        </div>
      ) : (
        <div className="flex w-full justify-between gap-3 flex-wrap flex-col  ">
          <p className=" text-xl  font-semibold "> Starting From $129</p>
          <div className="border rounded border-gray-300 w-full   px-4 py-2 gap-2 flex relative items-center ">
            <Image src="/calendar.svg" width={10} height={10} alt="calendar" />
            <span className=" text-gray-800 ">{selectedDate}</span>
            <div
              className={`rotate-180 ${
                mobileCalendar && 'rotate-0'
              } absolute  right-3 px-4  `}
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
          <div className=" flex flex-wrap w-full gap-2 ">
            {selectedAvailaibility.map(item => (
              <TimeOptions
                key={item.startTime}
                className="text-gray-800 border rounded border-gray-300 gap-2"
              >
                <input
                  type="checkbox"
                  className=" w-3 bg-red-800 rounded "
                  onClick={() => setSelectedTimeSlot(item)}
                  checked={item.id === selectedTimeSlot?.id}
                />

                <span className=" text-center flex-1 ">
                  {dayjs(item.startTime).format('  HH:mm A')}
                </span>
              </TimeOptions>
            ))}
          </div>
          {mobileCalendar && (
            <div className="relative">
              <StyledCelendar
                tileContent={({ activeStartDate, date, view }) => (
                  <DayContainer
                    active={
                      selectedDate === dayjs(date).format('YYYY-MM-DD')
                        ? true
                        : false
                    }
                  >
                    <p className="text-base font-semibold date  ">
                      {date.getDate()}
                    </p>
                    <p className=" text-sm  text-blue-400 price  ">
                      {priceCheck(date)}
                    </p>
                  </DayContainer>
                )}
                onClickDay={value => {
                  setSelectedDate(dayjs(value).format('YYYY-MM-DD'));
                  setMobileCalendar(false);
                }}
                tileDisabled={({ activeStartDate, date, view }) => {
                  if (
                    availabilityArray.includes(dayjs(date).format('YYYY-MM-DD'))
                  ) {
                    return false;
                  }
                  return true;
                }}
                /* onClickMonth={(value, event) =>
            } */
              />
            </div>
          )}
          <div className="flex flex-col sm:w-full  w-full">
            {seatsFull && (
              <p className=" text-red-600 text-base text-center">
                {' '}
                Maximum limit of seats reached{' '}
              </p>
            )}
            <div className="relative parent-container">
              <div className="flex justify-between bg-white align-middle p-2  border-r rounded-tr text-black">
                <h4>
                  {' '}
                  Adults X{passengerPax.adults.count}{' '}
                  {passengerPax.children && passengerPax.children?.count > 0
                    ? `Children X${passengerPax.children.count}`
                    : ``}{' '}
                  {passengerPax.infants && passengerPax.infants?.count > 0
                    ? ` Infants X ${passengerPax.infants.count}`
                    : ``}
                </h4>
                <button
                  className={`bg-white px-4 py-2 rounded-md rotate-180 text-left transition-transform transition-fast ${
                    isOpen && 'rotate-0'
                  } `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Image
                    src="/dropDown.png"
                    width={10}
                    height={10}
                    alt="dropdown"
                  />
                </button>
              </div>

              <div
                className={` relative md:relative right-0 py-2  bg-white   w-full ${
                  !isOpen ? 'hidden' : ''
                }`}
              >
                <div className="grid grid-cols-4">
                  <div className="col-span-2 flex flex-col  px-2   ">
                    <div className="flex items-center ">
                      <h4 className="text-black">
                        {passengerPax.adults.label}
                      </h4>
                      <span className="text-black    text-[10px] ">
                        (Ages 13+)
                      </span>
                    </div>
                    <div className=" flex justify-start ">
                      <div className="flex items-center ">
                        <h2 className=" text-[#F15C5A]  text-sm ">
                          ${passengerPax.adults.price}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-3">
                    <div className="flex justify-center items-center  ">
                      <button
                        onClick={() => {
                          if (passengerPax.adults.count <= 1) return;
                          setPassengerPax({
                            ...passengerPax,
                            adults: {
                              ...passengerPax.adults,
                              count: passengerPax.adults.count - 1
                            }
                          });
                        }}
                        className="col-span-1 rounded-full w-8 h-8 bg-white border-2  text-black"
                      >
                        -
                      </button>
                    </div>
                    <div className="flex justify-center items-center ">
                      <span className="col-span-1 text-center text-black">
                        {passengerPax.adults.count}
                      </span>
                    </div>{' '}
                    <div className="flex justify-center items-center ">
                      <button
                        onClick={() => {
                          if (!seatsFull)
                            setPassengerPax({
                              ...passengerPax,
                              adults: {
                                ...passengerPax.adults,
                                count: passengerPax.adults.count + 1
                              }
                            });
                        }}
                        className="col-span-1 rounded-full   w-8 h-8 bg-white border-2  text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {passengerPax.children && (
                  <div className="grid grid-cols-4">
                    <div className="col-span-2 flex flex-col   px-2 ">
                      <div className="flex items-center">
                        <h4 className="text-black">
                          {passengerPax.children.label}
                        </h4>
                        <span className="text-black    text-[10px] ">
                          (Ages 5-12)
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-start ">
                        <div className="flex items-center text-gray-500 ">
                          <h2 className=" text-[#F15C5A]  text-sm">
                            ${passengerPax.children.price}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-3">
                      <div className="flex justify-center items-center ">
                        <button
                          onClick={() => {
                            if (
                              passengerPax.children &&
                              passengerPax.children.count > 0
                            ) {
                              setPassengerPax({
                                ...passengerPax,
                                children: {
                                  ...passengerPax.children,
                                  count: passengerPax.children.count - 1
                                }
                              });
                            }
                          }}
                          className="col-span-1 rounded-full    w-8 h-8 bg-white border-2  text-black"
                        >
                          -
                        </button>
                      </div>
                      <div className="flex justify-center items-center ">
                        <span className="col-span-1 text-center text-black">
                          {passengerPax.children.count}
                        </span>
                      </div>{' '}
                      <div
                        onClick={() => {
                          if (passengerPax.children) {
                            if (!seatsFull)
                              setPassengerPax({
                                ...passengerPax,
                                children: {
                                  ...passengerPax.children,
                                  count: passengerPax.children.count + 1
                                }
                              });
                          }
                        }}
                        className="flex justify-center items-center "
                      >
                        <button className="col-span-1 rounded-full   w-8 h-8 bg-white border-2  text-black">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {passengerPax.infants && (
                  <div className="grid grid-cols-4">
                    <div className="col-span-2 flex flex-col  px-2 ">
                      <div className="flex items-center">
                        <h4 className="text-black">
                          {passengerPax.infants.label}
                        </h4>
                        <span className="text-black    text-[10px] ">
                          (Ages 0-5)
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-start ">
                        <div className="flex items-center ">
                          <h2 className=" text-[#F15C5A]  text-sm   ">
                            ${passengerPax.infants.price}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-3">
                      <div className="flex justify-center items-center ">
                        <button
                          onClick={() => {
                            if (
                              passengerPax.infants &&
                              passengerPax.infants.count > 0
                            ) {
                              setPassengerPax({
                                ...passengerPax,
                                infants: {
                                  ...passengerPax.infants,
                                  count: passengerPax.infants.count - 1
                                }
                              });
                            }
                          }}
                          className="col-span-1 rounded-full    w-8 h-8 bg-white border-2  text-black"
                        >
                          -
                        </button>
                      </div>
                      <div className="flex justify-center items-center ">
                        <span className="col-span-1 text-center text-black">
                          {passengerPax.infants.count}
                        </span>
                      </div>{' '}
                      <div className="flex justify-center items-center ">
                        <button
                          onClick={() => {
                            if (!seatsFull)
                              if (passengerPax.infants) {
                                setPassengerPax({
                                  ...passengerPax,
                                  infants: {
                                    ...passengerPax.infants,
                                    count: passengerPax.infants.count + 1
                                  }
                                });
                              }
                          }}
                          className="col-span-1 rounded-full   w-8 h-8 bg-white border-2  text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*     <div className="flex  justify-center border border-gray-300    rounded ">
            <div className=" text-center    ">
              <p className="block">Total price</p>
              <p className="text-[#FD5D5A] font-semibold  ">
                {' '}
                ${totalPrice.toFixed(2)}{' '}
              </p>
            </div>
          </div> */}
          <button
            className=" bg-[#FD5D5A] rounded-md py-3 text-white "
            onClick={() => proceedToCheckout()}
          >
            Check Availability
          </button>
          <div className="flex items-start gap-2    ">
            <Image
              src="/tickmark.png"
              className=" mt-2 "
              width={15}
              height={7}
              alt="tick mark"
            />
            <span>Lowest price guarantee </span>
          </div>
          <div className="flex items-start gap-2 ">
            <Image
              src="/tickmark.png"
              className=" mt-2 "
              width={15}
              height={7}
              alt="tick mark"
            />
            <span>Free Cancellation Up to 24hrs in advance </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateAndPax;
