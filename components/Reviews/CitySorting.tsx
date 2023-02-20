import { useState } from 'react';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';

interface IProps {
  cityFilter: Record<string, any>;
  setCityFilter: React.Dispatch<React.SetStateAction<
    Record<string, any>
  > | null>;
  citiesDropdown: Record<string, any>[] | undefined;
}
const sortCities = (cities: any) => {
  const sortedCities = cities
    ?.slice()
    .sort((a: any, b: any) => a.city.name.localeCompare(b.city.name));
  return sortedCities;
};

const CitiesSorting = ({
  cityFilter,
  setCityFilter,
  citiesDropdown
}: IProps) => {
  const [dropDownToggle, setDropdownToggle] = useState<boolean>(false);
  const sortedCitiesDropdown = sortCities(citiesDropdown);
  // console.log('citiesDropdown:', citiesDropdown);
  // console.log('SortedCitiesDropdown:', sortedCitiesDropdown);
  return (
    <div id="reviews-cities-dropdown">
      <div>
        <span className="text-[18px] text-[#333333] font-[400]">
          Filter By City:
        </span>

        <button
          className="pl-2"
          onClick={() => setDropdownToggle(!dropDownToggle)}
        >
          <span>All</span>
          <span className="inline-block pl-2">
            <DropdownIcon />
          </span>
        </button>
      </div>
      {dropDownToggle && (
        <div className="bg-[#FFFFFF] max-h-[300px] overflow-y-auto z-50">
          {sortedCitiesDropdown.map((city: any) => (
            <div
              key={city?.city.id}
              className="border border-slate-300 px-3 hover:cursor-pointer"
              onClick={() =>
                setCityFilter({
                  cities: {
                    slug: city?.city.slug
                  }
                })
              }
            >
              {city?.city.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitiesSorting;
