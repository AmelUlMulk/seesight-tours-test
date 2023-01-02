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
const Button = styled.button<Props>`
  background-color: ${props => (props.isActive ? '#22b3ed' : 'white')};
  border: ${props => (props.isActive ? 'none' : '1px solid black')};
  color: ${props => (props.isActive ? 'white' : 'gray')};
  &:hover {
    transform: scale(1.2);
    transition: 0.3s ease;
  }
`;
const FeaturedNavSection = ({ currNav, setActiveNav, navData }: IProps) => {
  return (
    <section className="Featured_Exp_Nav mt-10 text-xl">
      <nav className="flex justify-center items-center gap-10">
        {navData &&
          navData.map((navItem: Record<string, any>) => (
            <div key={navItem.filterClass}>
              <Button
                isActive={currNav === navItem.filterClass}
                className={
                  'py-2 px-5 rounded-lg'
                  // currNav === navItem.filterClass
                  //   ? 'activeNav py-2 px-5 rounded-lg'
                  //   : 'py-2 px-5 rounded-lg bg-white'
                }
                onClick={() => setActiveNav(`${navItem.filterClass}`)}
              >
                {navItem.filterName}
              </Button>
            </div>
          ))}
      </nav>
    </section>
  );
};

export default FeaturedNavSection;
