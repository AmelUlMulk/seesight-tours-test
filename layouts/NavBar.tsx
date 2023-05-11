import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Hamburger from 'hamburger-react';
import SideNav from './SideNav';

import Modal from '../components/MyTours/BookingSearchModal';

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener('change', updateTarget);
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};
const NavBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [myToursModal, setMyToursModal] = useState(false);
  const router = useRouter();
  const mediaQuery = useMediaQuery(1024);
  // eslint-disable-next-line no-console
  return (
    <header className=" px-[2%]  xl:px-[8%] 2xl:px-[10%] sticky top-0 z-[1020] bg-gray-100 ">
      <div className="py-2 md:py-5 mx-auto w-full  ">
        <div className="flex justify-between items-center gap-3 2xl:gap-12">
          <div className="logo  md:w-1/5 flex  justify-start  ">
            <Link href="/">
              <Image
                alt="sea sight tours logo"
                src="/logo.svg"
                width={200}
                height={57}
                className="max-h-[100px] w-32 md:w-44 "
              />
            </Link>
          </div>

          <div className=" lg:hidden xxsm:pr-[15px] sm:pr-[10px] w-[50%] flex justify-end ">
            <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
          </div>

          <div className=" hidden w-full lg:flex items-center">
            <div className="Navlinks w-4/5 flex text-[#060606] justify-center  text-base xl:text-lg gap-3  2xl:gap-[44px]  ">
              <Link
                href="/tours"
                className={
                  router.pathname.split('/')[1] == 'tours'
                    ? 'active hover:text-blue-400 px-1'
                    : 'hover:text-blue-400 px-1'
                }
              >
                Tours
              </Link>
              <Link
                href="/cities"
                className={
                  router.pathname.split('/')[1] == 'cities'
                    ? 'active hover:text-blue-400 px-1'
                    : 'hover:text-blue-400 px-1'
                }
              >
                Our Cities
              </Link>
              <Link
                href="/guides"
                className={
                  router.pathname.split('/')[1] == 'guides'
                    ? 'active hover:text-blue-400 px-1 '
                    : 'hover:text-blue-400 px-1'
                }
              >
                Our Guides
              </Link>
              <Link
                href="/reviews"
                className={
                  router.pathname.split('/')[1] == 'reviews'
                    ? 'active hover:text-blue-400 px-1'
                    : 'hover:text-blue-400 px-1'
                }
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className={
                  router.pathname.split('/')[1] == 'about'
                    ? 'active hover:text-blue-400 px-1'
                    : 'hover:text-blue-400 px-1'
                }
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={
                  router.pathname.split('/')[1] == 'contact'
                    ? 'active hover:text-blue-400 px-2 border-r-[1px] border-black '
                    : 'hover:text-blue-400 pl-2 md:pr-2 lg:pr-4  border-gray-300'
                }
              >
                Contact Us
              </Link>
            </div>
            <div className="flex w-1/5 justify-end ">
              <button
                onClick={() => setMyToursModal(true)}
                className={` bg-[#F15C5A] p-3 text-white rounded-lg text-center  ${
                  router.pathname.split('/')[1] == 'my-tours'
                    ? ' hover:bg-red-500   '
                    : 'hover:text-white '
                }
              `}
              >
                My Tours
              </button>
            </div>
          </div>
        </div>
      </div>
      <SideNav
        isOpen={isOpen}
        setOpen={setOpen}
        setOpenMyTours={setMyToursModal}
      />
      <Modal open={myToursModal} setOpenModal={setMyToursModal} />
    </header>
  );
};

export default NavBar;
