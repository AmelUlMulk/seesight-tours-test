import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import { useRouter } from 'next/router';

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
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const mediaQuery = useMediaQuery(900);
  // eslint-disable-next-line no-console
  return (
    <section className="Navbar py-5 bg-gray-300">
      <div className="flex justify-between">
        <Link href="/">
          <div className="logo">
            <h1>Seesight Logo</h1>
          </div>
        </Link>

        {mediaQuery ? (
          <div className="pr-10">
            <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
          </div>
        ) : (
          <div className="Navlinks flex gap-5">
            <Link
              href="/tours"
              className={
                router.pathname.split('/')[1] == 'tours'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              Tours
            </Link>
            <Link
              href="/cities"
              className={
                router.pathname.split('/')[1] == 'cities'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              Our Cities
            </Link>
            <Link
              href="/guides"
              className={
                router.pathname.split('/')[1] == 'guides'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              Our Guides
            </Link>
            <Link
              href="/reviews"
              className={
                router.pathname.split('/')[1] == 'reviews'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className={
                router.pathname.split('/')[1] == 'about'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={
                router.pathname.split('/')[1] == 'contact'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              Contact Us
            </Link>
            <Link
              href="/my-tours"
              className={
                router.pathname.split('/')[1] == 'my-tours'
                  ? 'active hover:text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              My Tours
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NavBar;
