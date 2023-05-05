import axios from 'axios';
import { PASSENGERINFO } from '../pages/checkout';
import dayjs from 'dayjs';

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
type FetchProductInterface = {
  rezdyId: string;
};
export const fetchProductAvailabilities = async ({
  rezdyId
}: FetchProductInterface) => {
  const {
    data: { data: productAvailabities }
  } = await axios.post<axiosReturn>(
    `${process.env.NEXT_PUBLIC_AVAILABILITY_URI}/availability`,
    {
      code: rezdyId,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(12, 'months').format('YYYY-MM-DD')
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  console.log('the availabilities', productAvailabities);
  return productAvailabities;
};
