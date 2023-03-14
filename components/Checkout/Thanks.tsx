import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
interface ThankYouProps {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}
const Thankyou = ({ open, close }: ThankYouProps) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, []);

  return (
    <div
      className={`${
        !open ? 'hidden' : ''
      } h-[150vh] fixed z-[150] bg-black top-0 left-0 w-screen flex  items-center justify-center `}
    >
      <div className="flex h-screen items-start ">
        <h2 className="text-4xl text-center text-white">
          Booking Successfully Created Thank you!
        </h2>
      </div>
    </div>
  );
};

export default Thankyou;
