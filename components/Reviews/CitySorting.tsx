import { SetStateAction, useState } from 'react';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';

interface IProps {
  city: string | undefined;
  setCity: React.Dispatch<SetStateAction<string | undefined>>;
  cityFilter: Record<string, any>;
  setCityFilter: React.Dispatch<React.SetStateAction<
    Record<string, any>
  > | null>;
  citiesDropdown: Record<string, any>[] | undefined;
  citiesToggle: boolean;
  setCitiesToggle: React.Dispatch<SetStateAction<boolean>>;
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
  citiesDropdown,
  city,
  setCity,
  citiesToggle,
  setCitiesToggle
}: IProps) => {
  const sortedCitiesDropdown = sortCities(citiesDropdown);
  return (
    <div id="reviews-cities-dropdown" className="relative">
      <div>
        <span className="text-[14px] sm:text-[18px] text-[#333333] font-[400]">
          Filter By City:
        </span>

        <button
          className="pl-1 sm:pl-2 text-[14px] sm:text-[18px]"
          onClick={() => setCitiesToggle(!citiesToggle)}
        >
          <span className="pl-2">{city ? city : 'ALL'}</span>
          <span className="inline-block pl-2">
            <DropdownIcon />
          </span>
        </button>
      </div>
      {citiesToggle && (
        <div className="bg-[#FFFFFF] rounded-b-[5px] max-h-[300px] overflow-y-auto absolute top-[100%] w-[100%] z-50">
          <div
            onClick={() => {
              setCityFilter(null);
              setCity('ALL');
            }}
            className="border border-slate-300 px-3 hover:cursor-pointer"
          >
            ALL
          </div>
          {sortedCitiesDropdown.map((city: any) => (
            <div
              key={city?.city.id}
              className="border border-slate-300 px-3 hover:cursor-pointer"
              onClick={() => {
                setCity(city?.city?.name);
                setCityFilter({
                  cities: {
                    slug: city?.city.slug
                  }
                });
                setCitiesToggle(!citiesToggle);
              }}
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
