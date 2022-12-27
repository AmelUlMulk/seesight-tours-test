import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Hamburger from 'hamburger-react';
import Container from 'react-bootstrap/Container';
import SideNav from './SideNav';
import logoMini from '../assets/svg/logo.svg';

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
  const mediaQuery = useMediaQuery(900);
  // eslint-disable-next-line no-console
  return (
    <header className="Navbar relative py-5 bg-gray-100">
      <Container>
        <div className="flex justify-between items-center px-5">
          <Link href="/">
            <div className="logo">
              <Image src={logoMini} alt="logo" className="h-10" />
            </div>
          </Link>

          {mediaQuery ? (
            <div className="pr-10">
              <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
            </div>
          ) : (
            <div className="Navlinks flex gap-4">
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
                    ? 'active hover:text-blue-400 px-1 border-r-[1px] border-black '
                    : 'hover:text-blue-400 px-2 border-r-[1px] border-gray-300'
                }
              >
                Contact Us
              </Link>
              <Link
                href="/my-tours"
                className={
                  router.pathname.split('/')[1] == 'my-tours'
                    ? 'active hover:text-blue-400 px-1 '
                    : 'hover:text-blue-400 pl-1'
                }
              >
                My Tours
              </Link>
            </div>
          )}
        </div>
      </Container>
      <SideNav isOpen={isOpen} setOpen={setOpen} />
    </header>
  );
};

export default NavBar;
