import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Hamburger from 'hamburger-react';
import SideNav from './SideNav';
import logo from '../assets/svg/logo.svg';

const useMediaQuery = (width: number) => {
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
  const router = useRouter();
  const mediaQuery = useMediaQuery(1024);
  // eslint-disable-next-line no-console
  return (
    <header className="Navbar sticky top-0 z-[1020] bg-gray-100 ">
      <div className="py-2 md:py-5 mx-auto 2xl:max-w-[1650px] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[832px] sm:max-w-[640px] xsm:max-w-[576px] ">
        <div className="flex justify-between items-center gap-12">
          <div className="logo pl-4 ">
            <Link href="/">
              <Image
                alt="sea sight tours logo"
                src="/logo.svg"
                width={200}
                height={200}
              />
            </Link>
          </div>

          {mediaQuery ? (
            <div className="xxsm:pr-[15px] sm:pr-[10px] w-[50%] flex justify-end ">
              <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
            </div>
          ) : (
            <div className="Navlinks flex md:gap-[0.57rem] lg:gap-4 md:px-3 lg:px-5 md:text-[0.79rem] lg:text-[1.12375rem]">
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
                    : 'hover:text-blue-400 pl-2 md:pr-2 lg:pr-4 border-r-[1px] border-gray-300'
                }
              >
                Contact Us
              </Link>
              <Link
                href="/my-tours"
                className={
                  router.pathname.split('/')[1] == 'my-tours'
                    ? 'active hover:text-blue-400 pr-2 '
                    : 'hover:text-blue-400 pl-1'
                }
              >
                My Tours
              </Link>
            </div>
          )}
        </div>
      </div>
      <SideNav isOpen={isOpen} setOpen={setOpen} />
    </header>
  );
};

export default NavBar;
