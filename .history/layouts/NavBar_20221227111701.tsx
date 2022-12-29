import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  return (
    <div className="flex w-100 bg-blue-400">
      <div className="logo flex-1">
        <h1>Seesight Logo</h1>
      </div>
      <div className="links w-80">
        <Link href="/tours" className=" bg-red-700 ">
          Tours
        </Link>
        <Link href="/cities">Our Cities</Link>
        <Link href="/guides">Our Guides</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/my-tours">My Tours</Link>
      </div>
    </div>
  );
};

export default NavBar;
