import Link from 'next/link';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styled from 'styled-components';
import FaceBookIcon from '../assets/svg/aifillfb.svg';
import TwitterIcon from '../assets/svg/aifilltwittersquare.svg';
import InstagramIcon from '../assets/svg/fainstagramsquare.svg';
// import YoutubeIcon from '../assets/svg/fayoutubesquare';

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideNav = ({ isOpen, setOpen }: IProps) => {
  const SideNav_Wrapper = styled.div`
    height: 100vh;
    .pro-sidebar-inner {
      background: #56b8e7;
    }
    .pro-menu {
      a {
        color: #e5e5e5;
      }
      .pro-menu-item {
        font-size: 1.3rem;
      }
    }
  `;
  return (
    <SideNav_Wrapper
      style={!isOpen ? { display: 'none' } : {}}
      className="absolute top-[100%]"
      onClick={() => setOpen(false)}
    >
      <ProSidebar collapsed={!isOpen}>
        <SidebarContent>
          <Menu>
            <Link href="/" onClick={() => setOpen(true)}>
              <MenuItem className="">Home</MenuItem>
            </Link>
            <Link href="/tours" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Day Tours</MenuItem>
            </Link>
            <Link href="/multi-day-tours" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Multi Day Tours</MenuItem>
            </Link>
            <Link href="/cities" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Cities</MenuItem>
            </Link>
            <Link href="/guides" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Guides</MenuItem>
            </Link>
            <Link href="/reviews" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Reviews</MenuItem>
            </Link>
            <Link href="/about" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">About Us</MenuItem>
            </Link>
            <Link href="/trip-shepherd" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">TripSheppard</MenuItem>
            </Link>
            <Link href="/contact" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Contact Us</MenuItem>
            </Link>
            <Link href="/careers" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Careers</MenuItem>
            </Link>
            <Link href="/partner" onClick={() => setOpen(true)}>
              <MenuItem className="py-1">Become A Partner</MenuItem>
            </Link>
            <Link href="/my-tours" onClick={() => setOpen(true)}>
              <MenuItem className="">My Tours</MenuItem>
            </Link>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem>
              <a
                href="https://www.facebook.com/NiagaraFallsTours"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="This is an external link (opens in a new tab)"
              >
                <FaceBookIcon />
              </a>
              <a
                href="https://www.instagram.com/seesighttours/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="This is an external link (opens in a new tab)"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://twitter.com/seesighttours?lang=en"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="This is an external link (opens in a new tab)"
              >
                <TwitterIcon />
              </a>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </SideNav_Wrapper>
  );
};

export default SideNav;
