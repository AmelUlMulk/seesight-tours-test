import { useState } from 'react';
import { BOOKING } from '../../api/my-tours';
import Maps from './component/Maps';
import SectionWrapper from './component/SectionWrapper';

interface ConfirmationProps {
  booking: BOOKING | undefined;
  setThankYou: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationLoading: React.Dispatch<React.SetStateAction<boolean>>;
  next: () => void;
}

const ConfirmBooking = ({
  booking,
  setThankYou,
  setConfirmationLoading,
  next
}: ConfirmationProps) => {
  const [pickupLocation, setPickUpLocation] = useState<string>('');

  const [specialRequierment, setSpecialRequierments] = useState<string>('');

  const center = {
    lat: booking?.product.city[0].city.coordinates.lat || 0,
    lng: booking?.product.city[0].city.coordinates.lng || 0
  };
  return (
    <SectionWrapper
      title={`Thank you ${booking?.customer.name} for booking with us , please confirm your details `}
    >
      <div className="flex w-full justify-between">
        <div className="w-full min-h-[40vh]">
          {booking && center.lat !== 0 && (
            <Maps
              pickupBounds={booking?.product.pickupBounds}
              center={center}
              setPickUpLocation={setPickUpLocation}
              pickupLocation={pickupLocation}
              setSpecialRequierments={setSpecialRequierments}
              specialRequierment={specialRequierment}
              customer={{
                email: booking?.customer.email,
                name: booking?.customer.name,
                secondaryPhone: booking?.customer.secondaryPhone,
                secondaryEmail: booking?.customer.secondaryEmail
              }}
              source={booking?.source}
              rezdyId={booking?.REZDY[0]?.id || ''}
              id={booking.id}
              status={booking.status}
              phone={booking.customer.phone}
              setThankYou={setThankYou}
              setConfirmationLoading={setConfirmationLoading}
              next={next}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ConfirmBooking;
