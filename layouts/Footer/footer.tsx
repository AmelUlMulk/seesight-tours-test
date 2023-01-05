import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import InstagramIcon from '../../assets/svg/insta-icon.svg';
import FacebookIcon from '../../assets/svg/fb-icon.svg';
import TwitterIcon from '../../assets/svg/twt-icon.svg';
import YoutubeIcon from '../../assets/svg/youtb-icon.svg';
import ClockIcon from '../../assets/svg/Time.svg';
import MobileIcon from '../../assets/svg/phone-icon.svg';
import MessageIcon from '../../assets/svg/Message.svg';
interface Props {
  isActive: boolean;
}
const LinkStyle = styled.div<Props>`
  color: ${props => (props.isActive ? 'red' : 'inherit')};
`;
const Footer = () => {
  const router = useRouter();
  return (
    <section id="footer_section ">
      <div className="flex px-20">
        <div className="flex flex-wrap  gap-14 max-w-[1200px] mx-auto w-[100%] ">
          <div className="logo-section w-[100%] lg:w-[35%] sm:w-[50%] xsm:w-[90%] md:w-[40%]">
            <div id="image-wrapper">
              <Image
                src="/logo.svg"
                width={200}
                height={200}
                alt="sea sight log image"
              ></Image>
            </div>
            <div id="intro-paragraph " className="max-w-[350px] pt-10">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic
            </div>
          </div>
          <div id="book_your_tour mt-5">
            <h1 className="text-2xl font-bold">Book your Tour</h1>
            <ul>
              <li className="py-2">
                <Link href="/tours">
                  <LinkStyle isActive={router.asPath === '/tours'}>
                    Day Tours
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/multi-day-tours">
                  <LinkStyle isActive={router.asPath === '/multi-day-tours'}>
                    Mutli Day Tours
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/cities">
                  <LinkStyle isActive={router.asPath === '/cities'}>
                    Discover Cities
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="trip-shepherd">
                  <LinkStyle isActive={router.asPath === '/trip-shepherd'}>
                    Trip Shepherd
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/faq">
                  <LinkStyle isActive={router.asPath === '/faq'}>
                    FAQ&apos;s
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/reviews">
                  <LinkStyle isActive={router.asPath === '/reviews'}>
                    Reviews
                  </LinkStyle>
                </Link>
              </li>
            </ul>
          </div>
          <div id="menu">
            <h1 className="text-2xl font-bold">Menu</h1>
            <ul className="mt-5">
              <li className="py-2">
                <Link href="/blog">
                  <LinkStyle isActive={router.asPath === '/blog'}>
                    Day Tours
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/privacy">
                  <LinkStyle isActive={router.asPath === '/privacy'}>
                    Privacy Policy
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/about">
                  <LinkStyle isActive={router.asPath === '/about'}>
                    About Us
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/contact">
                  <LinkStyle isActive={router.asPath === '/contact'}>
                    Contact Us
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/careers">
                  <LinkStyle isActive={router.asPath === '/careers'}>
                    Careers
                  </LinkStyle>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/partner">
                  <LinkStyle isActive={router.asPath === '/partner'}>
                    Become a Partner
                  </LinkStyle>
                </Link>
              </li>
            </ul>
          </div>
          <div id="get_in_touch">
            <h1 className="text-2xl font-bold">Get in Touch</h1>
            <ul className="mt-5">
              <li className="py-2 flex gap-5 items-center">
                <div>
                  <ClockIcon />
                </div>
                <div>8am- 4am (Monday - Friday)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div>
                  <MobileIcon />
                </div>
                <div>1-888-961-6584 (Toll Free)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div>
                  <MobileIcon />
                </div>
                <div> 1-289-271-9767 (Local)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div>
                  <MobileIcon />
                </div>
                <div>1-8880-908-6056 (fax)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div>
                  <MessageIcon />
                </div>
                <div className="text-red-500"> Info@seesight-tours.com</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="follow_us" className="mt-2 ">
        <div className="w-[80%] lg:w-[40%] md:w-[60%] sm:w-[70%] xsm:w-[95%] ml-auto flex flex-wrap gap-11 xsm:gap-8 xxsm:gap-5 justify-center items-center bg-blue-500 text-2xl xsm:text-[1.20rem] text-center text-white rounded-l-[25px] py-3">
          <div>Follow us</div>
          <a
            href="https://www.instagram.com/seesighttours/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/NiagaraFallsTours"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://twitter.com/seesighttours?lang=en"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.youtube.com/user/SeeSightTours"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
