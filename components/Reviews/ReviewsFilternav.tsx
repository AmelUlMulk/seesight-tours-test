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
}
const ReviewsFilterNav = ({
  cityFilter,
  setCityFilter,
  sortOrder,
  setSortOrder,
  citiesDropdown
}: IProps) => {
  return (
    <section id="reviews filter" className="mt-5">
      <div className="flex justify-between px-16 ">
        <CitiesSorting
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          citiesDropdown={citiesDropdown}
        />
        <ReviewsSorting sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
    </section>
  );
};

export default ReviewsFilterNav;
