import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import DateAndPax from './DateAndPax';
import { PaxContext } from '../../utils/checkoutContext';
import { useLazyQuery } from '@apollo/client';
import FETCH_PRODUCT_DETAILS from '../../api/product';

interface CalendarPaxModal {
  tour: string;
  tourId: string;
  tourImage: string;
  open: boolean;
  setOpenPax: Dispatch<SetStateAction<boolean>>;
}

const CalendarPaxModal = ({
  tour,
  tourId,
  tourImage,
  open,
  setOpenPax
}: CalendarPaxModal) => {
  //@ts-ignore
  const { updateTour } = useContext(PaxContext);
  const [loading, setLoadin] = useState<boolean>(true);
  const [getProductBoat, { data }] = useLazyQuery(FETCH_PRODUCT_DETAILS, {
    variables: {
      id: tourId
    }
  });
  console.log('this is the data', tour, tourId, tourImage);
  useEffect(() => {
    if (open) {
      getProductBoat();
      return;
    }
  }, [open]);
  const updateTourContext = () => {
    updateTour({
      tour,
      tourId,
      tourImage
    });
  };
  return (
    <div
      className={` ${
        open ? 'flex' : 'hidden '
      } items-center w-screen h-screen bg-black bg-opacity-80 justify-center fixed top-0 z-50 left-0  `}
      onClick={e => setOpenPax(false)}
    >
      <div
        className="bg-white p-6 max-w-[350px] min-w-[350px] "
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <button
          className=" rotate-45 absolute top-0  text-3xl right-0 w-8 "
          onClick={() => setOpenPax(false)}
        >
          +
        </button>
        {data?.boatnew_products[0]?.rezdy.rezdy_id && (
          <DateAndPax
            rezdyId={data.boatnew_products[0].rezdy.rezdy_id}
            updateTourContext={updateTourContext}
            mobile={true}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPaxModal;
