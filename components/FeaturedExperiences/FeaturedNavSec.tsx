import { SetStateAction } from 'react';
import styled from 'styled-components';

interface IProps {
  currNav: string;
  setActiveNav: React.Dispatch<SetStateAction<string>>;
  navData: Record<string, any>[];
}
interface Props {
  isActive: boolean;
}
const NavMenu = styled.div<Props>`
  color: ${props => (props.isActive ? '#F15C5A' : '#333333')};
  border-radius: ${props => (props.isActive ? '10px' : 'none')};
  box-shadow: ${props =>
    props.isActive ? '1px 1px 2px 1px rgba(0, 0, 0, 0.2)' : 'none'};
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    transform: scale(1.2);
    transition: 0.3s ease;
  }
`;
const FeaturedNavSection = ({ currNav, setActiveNav, navData }: IProps) => {
  return (
    <section
      id="featured_exp_nav"
      className="xxsm:mb-5 lg:mb-0 lg:flex-none lg:w-[65%]"
    >
      <nav className="flex xsm:justify-between xsm:gap-3 sm:gap-5 lg:justify-start items-center md:gap-5 lg:gap-8">
        {navData &&
          navData.map((navItem: Record<string, any>) => (
            <NavMenu
              key={navItem.filterClass}
              isActive={currNav === navItem.filterClass}
              className={
                'py-2 xsm:px-3 sm:px-4 md:px-8 lg:px-5 border-l-[1px] border-[#C5C5C5] xsm:text-[14px] sm:text-[15px] md:text-[17px] lg:text-[16px] 2xl:text-[24px] font-[600]'
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
