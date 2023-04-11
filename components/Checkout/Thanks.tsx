import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
      } h-[100vh] fixed z-[150] bg-black bg-opacity-60 top-0 left-0 w-screen flex  items-center justify-center `}
    >
      <div className="flex items-start  ">
        <div className="bg-white py-[2%] lg:py-[8%] px-[2%]  flex items-center flex-col gap-4 ">
          <Image width={200} height={200} alt="logo" src="/logo.svg" />
          <h2 className="text-4xl  text-black text-center   ">
            Thank you for booking with Seesight tours!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
