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
import YoutubeIcon from '../assets/svg/fayoutubesquare.svg';

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMyTours: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideNav_Wrapper = styled.div`
  .pro-sidebar {
    height: calc(100vh - 62px);
    position: fixed;
    transition: width, left, right, 0.3s;

    .pro-sidebar-layout {
      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }

    .pro-menu {
      height: 100%;
      padding-bottom: 25px;
    }
  }
  .pro-sidebar-inner {
    background: #56b8e7;
    .pro-sidebar-content {
      margin-left: 20px;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
      .pro-menu {
        a {
          color: #fffdfd;
        }
        a:hover {
          color: #d9d9d9;
        }
        a::before {
          content: none;
        }
        .pro-menu-item {
          font-size: 1.4rem;
        }
        .pro-menu-item:hover {
          background-color: #423dd6;
        }
      }
    }
    .pro-sidebar-footer {
      .pro-menu {
        .pro-menu-item {
          .pro-inner-item {
            padding: 10px 20px;
            .pro-item-content {
              display: flex;
              justify-content: center;
              gap: 13px;

              a::before {
                content: none;
              }

              svg {
                font-size: 20px;
                color: white;
              }
              svg:hover {
                color: #d9d6d6;
              }
            }
          }
        }
      }
    }
  }
`;
const SideNav = ({ isOpen, setOpen, setOpenMyTours }: IProps) => {
  return (
    <div
      id="nav-overlay"
      className={
        !isOpen
          ? 'hidden'
          : 'h-[100vh] w-[100%] bg-transparent absolute top-[100%] left-0'
      }
      onClick={() => setOpen(false)}
    >
      <SideNav_Wrapper className="left-0">
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
              <span
                onClick={() => {
                  setOpenMyTours(true);
                  setOpen(true);
                }}
                className="text-white"
              >
                <MenuItem className="">My Tours</MenuItem>
              </span>
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
                  className="inline"
                >
                  <FaceBookIcon />
                </a>
                <a
                  href="https://www.youtube.com/user/SeeSightTours"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="This is an external link (opens in a new tab)"
                >
                  <YoutubeIcon />
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
    </div>
  );
};

export default SideNav;
