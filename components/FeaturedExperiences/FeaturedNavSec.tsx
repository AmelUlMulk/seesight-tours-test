import { SetStateAction } from 'react';
import styled from 'styled-components';

interface IProps {
  currNav: string;
  setActiveNav: React.Dispatch<SetStateAction<string>>;
  navData: Record<string, any>[];
}
interface Props {
  isActive: boolean;
  isFirstOne: boolean;
}
const NavMenu = styled.div<Props>`
  border-left: 1px solid '#C5C5C5';
  color: ${props => (props.isActive ? '#F15C5A' : '#333333')};
  border-left: ${props => (props.isFirstOne ? 'none' : '1px solid #C5C5C5')};
  font-weight: ${props => (props.isActive ? '700' : '600')};
  @media (max-width: 576px) {
    font-weight: ${props => (props.isActive ? '600' : '400')};
  }
  cursor: pointer;
  &:hover {
    /* box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2); */
    /* border-radius: 5px; */
    transform: scale(1.1);
    transition: 0.3s ease;
  }
`;
const FeaturedNavSection = ({ currNav, setActiveNav, navData }: IProps) => {
  return (
    <section
      id="featured_exp_nav"
      className="xxsm:mb-5 lg:mb-0 lg:flex-none lg:w-[65%]"
    >
      <nav className="flex justify-between lg:justify-start items-center sm:gap-5 md:gap-3 lg:gap-0">
        {navData &&
          navData.map((navItem: Record<string, any>, index: Number) => (
            <NavMenu
              key={navItem.filterClass}
              isActive={currNav === navItem.filterClass}
              isFirstOne={navItem.filterClass === 'allThings'}
              className={
                'px-1 xsm:px-2 sm:px-4 md:px-8 lg:px-3 xl:px-5 text-[12px] xsm:text-[14px] sm:text-[18px] md:text-[17px] lg:text-[19px] 2xl:text-[24px]'
              }
              onClick={() => setActiveNav(`${navItem.filterClass}`)}
            >
              {navItem.filterName}
            </NavMenu>
          ))}
      </nav>
    </section>
  );
};

export default FeaturedNavSection;
