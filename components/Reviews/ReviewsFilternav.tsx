import { SetStateAction, useState } from 'react';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
import CitiesSorting from './CitySorting';
import ReviewsSorting from './ReviewsSorting';

interface IProps {
  cityFilter: Record<string, any>;
  setCityFilter: React.Dispatch<React.SetStateAction<
    Record<string, any>
  > | null>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  citiesDropdown: Record<string, any>[] | undefined;
  citiesToggle: boolean;
  setCitiesToggle: React.Dispatch<SetStateAction<boolean>>;
  sortToggle: boolean;
  setSortToggle: React.Dispatch<SetStateAction<boolean>>;
}
const ReviewsFilterNav = ({
  cityFilter,
  setCityFilter,
  sortOrder,
  setSortOrder,
  citiesDropdown,
  citiesToggle,
  setCitiesToggle,
  sortToggle,
  setSortToggle
}: IProps) => {
  const [city, setCity] = useState<string | undefined>();

  return (
    <section id="reviews filter" className="mt-5">
      <div className="flex justify-between px-5 xsm:px-8 sm:px-16 ">
        <CitiesSorting
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          citiesDropdown={citiesDropdown}
          city={city}
          setCity={setCity}
          citiesToggle={citiesToggle}
          setCitiesToggle={setCitiesToggle}
        />
        <ReviewsSorting
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortToggle={sortToggle}
          setSortToggle={setSortToggle}
        />
      </div>
    </section>
  );
};

export default ReviewsFilterNav;
