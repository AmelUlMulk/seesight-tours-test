import Image from 'next/image';
import { useLazyQuery } from '@apollo/client';
import { SetStateAction, useEffect } from 'react';
import { CITIES_PRODUCT_FILTER } from '../../api/reviews';
import TourDropDown from './TourDropdown';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';

interface IProps {
  cities: any;
  selectedCity: string | null;
  setSelectedCity: React.Dispatch<SetStateAction<string | null>>;
  selectedCityProduct: string | null;
  setSelectedCityProduct: React.Dispatch<SetStateAction<string | null>>;
  setTourDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  tourDropdownToggle: boolean;
  setCityDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  cityDropdownToggle: boolean;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
  errorStates: Record<string, boolean>;
  setErrorStates: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}
const CityTours = ({
  cities,
  selectedCity,
  setSelectedCity,
  selectedCityProduct,
  setSelectedCityProduct,
  setTourDropdownToggle,
  tourDropdownToggle,
  cityDropdownToggle,
  setCityDropdownToggle,
  submitReview,
  setSubmitReview,
  errorStates,
  setErrorStates
}: IProps) => {
  // console.log('Related City Tours:', cities);
  return (
    <button
      className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
      onClick={() => setTourDropdownToggle(!tourDropdownToggle)}
    >
      <div className="flex justify-center items-center ">
        <span className="px-3">
          <Image
            src={'/locationIcon.svg'}
            width={33}
            height={33}
            alt="calendar image"
          />
        </span>
        <span
          className="px-2"
          onClick={() => setTourDropdownToggle(!cityDropdownToggle)}
        >
          {selectedCityProduct ? selectedCityProduct : ' Find Your Tours'}
        </span>
      </div>
      <div>
        <DropdownIcon
          onClick={() => setTourDropdownToggle(!tourDropdownToggle)}
        />
      </div>
      <div
        id="tours-dropdown"
        className="absolute top-[100%] left-0 w-[100%] bg-white z-50 max-h-[400px] overflow-y-auto rounded-[15px]"
      >
        {tourDropdownToggle && cities && (
          <>
            <TourDropDown
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCityProduct={selectedCityProduct}
              setSelectedCityProduct={setSelectedCityProduct}
              data={cities[0]?.allThings}
              title="All Things "
              submitReview={submitReview}
              setSubmitReview={setSubmitReview}
              errorStates={errorStates}
              setErrorStates={setErrorStates}
            />
            <TourDropDown
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCityProduct={selectedCityProduct}
              setSelectedCityProduct={setSelectedCityProduct}
              data={cities[0]?.dayTours}
              title="Day Tours "
              submitReview={submitReview}
              setSubmitReview={setSubmitReview}
              errorStates={errorStates}
              setErrorStates={setErrorStates}
            />
            <TourDropDown
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCityProduct={selectedCityProduct}
              setSelectedCityProduct={setSelectedCityProduct}
              data={cities[0]?.multiday}
              title="Mutli Day Tours "
              submitReview={submitReview}
              setSubmitReview={setSubmitReview}
              errorStates={errorStates}
              setErrorStates={setErrorStates}
            />
          </>
        )}
      </div>
    </button>
  );
};

export default CityTours;
