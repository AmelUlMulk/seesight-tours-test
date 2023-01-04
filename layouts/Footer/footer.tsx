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
const Link_Style = styled.div<Props>`
  color: ${props => (props.isActive ? 'red' : 'inherit')};
`;
const Footer = () => {
  const router = useRouter();
  console.log(router.asPath.split('/')[1]);
  return (
    <section className="footer_section ">
      <div className="flex px-20">
        <div className="flex flex-wrap  gap-14 max-w-[1200px] mx-auto w-[100%] ">
          <div className="logo-section w-[100%] lg:w-[35%] sm:w-[50%] xsm:w-[90%] md:w-[40%]">
            <div className="image-wrapper">
              <Image
                src="/logo.svg"
                width={200}
                height={200}
                alt="sea sight log image"
              ></Image>
            </div>
            <div className="into-paragraph max-w-[350px] pt-10">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic
            </div>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">Book your Tour</h1>
            <ul className="Book_your_tour mt-5">
              <li className="py-2">
                <Link href="/tours">
                  <Link_Style isActive={router.asPath === '/tours'}>
                    Day Tours
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/multi-day-tours">
                  <Link_Style isActive={router.asPath === '/multi-day-tours'}>
                    Mutli Day Tours
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/cities">
                  <Link_Style isActive={router.asPath === '/cities'}>
                    Discover Cities
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="trip-shepherd">
                  <Link_Style isActive={router.asPath === '/trip-shepherd'}>
                    Trip Shepherd
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/faq">
                  <Link_Style isActive={router.asPath === '/faq'}>
                    FAQ&apos;s
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/reviews">
                  <Link_Style isActive={router.asPath === '/reviews'}>
                    Reviews
                  </Link_Style>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">Menu</h1>
            <ul className="Menu mt-5">
              <li className="py-2">
                <Link href="/blog">
                  <Link_Style isActive={router.asPath === '/blog'}>
                    Day Tours
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/privacy">
                  <Link_Style isActive={router.asPath === '/privacy'}>
                    Privacy Policy
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/about">
                  <Link_Style isActive={router.asPath === '/about'}>
                    About Us
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/contact">
                  <Link_Style isActive={router.asPath === '/contact'}>
                    Contact Us
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/careers">
                  <Link_Style isActive={router.asPath === '/careers'}>
                    Careers
                  </Link_Style>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/partner">
                  <Link_Style isActive={router.asPath === '/partner'}>
                    Become a Partner
                  </Link_Style>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">Get in Touch</h1>
            <ul className="Get_in_touch mt-5">
              <li className="py-2 flex gap-5 items-center">
                <div className="">
                  <ClockIcon />
                </div>
                <div>8am- 4am (Monday - Friday)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div className="">
                  <MobileIcon />
                </div>
                <div>1-888-961-6584 (Toll Free)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div className="">
                  <MobileIcon />
                </div>
                <div> 1-289-271-9767 (Local)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div className="">
                  <MobileIcon />
                </div>
                <div>1-8880-908-6056 (fax)</div>
              </li>
              <li className="py-2 flex gap-5 items-center">
                <div className="">
                  <MessageIcon />
                </div>
                <div className="text-red-500"> Info@seesight-tours.com</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="follow_us mt-2 ">
        <div className="w-[80%] lg:w-[40%] md:w-[60%] sm:w-[70%] xsm:w-[95%] ml-auto flex flex-wrap gap-11 xsm:gap-8 xxsm:gap-5 justify-center items-center bg-blue-500 text-2xl xsm:text-[1.20rem] text-center text-white rounded-l-[25px] py-3">
          <div className="">Follow us</div>
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
          <YoutubeIcon />
        </div>
      </div>
    </section>
  );
};

export default Footer;
