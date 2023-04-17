import { useLazyQuery } from '@apollo/client';
import dayjs from 'dayjs';
import {
  CONFIRMED_BOOKING_BY_DATE,
  RECENTCONFIRMEDBOOKINGS
} from '../../api/socialProofs';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const RecentConfirmBookings = () => {
  const [triggerBookings, { data, loading, error }] =
    useLazyQuery<RECENTCONFIRMEDBOOKINGS>(CONFIRMED_BOOKING_BY_DATE);

  const timeIdArray: number[] = [];

  useEffect(() => {
    const bookingDelay = setTimeout(() => {
      triggerBookings({
        variables: {
          pastDate: dayjs().subtract(1, 'days').format('YYYY-MM-DD'),
          today: dayjs().format('YYYY-MM-DD')
        }
      });
      //clean up
      return () => clearTimeout(bookingDelay);
    }, 10000);
  }, []);
  console.log('recent Booking');
  console.log(data?.bookings);
  useEffect(() => {
    data?.bookings.map((booking, index) => {
      const recall = window.setTimeout(() => {
        toast.info(
          <div>
            <div>
              <span id="emoji-face">🤩</span>
              <span>
                {' '}
                {booking.product.citiesProducts[0].city.name.split(' ')[0]}
              </span>
            </div>

            <p>
              Confirmed a tour of {booking.product.citiesProducts[0].city.name}{' '}
              {dayjs().diff(dayjs(booking.createdAt), 'hour')} hours ago
            </p>
            {/* <p>{booking.customer.customerName}</p> */}
          </div>
        );
      }, index * 20000);

      timeIdArray.push(recall);
    });
    return () => {
      timeIdArray.map(timerId => clearTimeout(timerId));
    };
  }, [data]);
  return null;
};

export default RecentConfirmBookings;
