import Image from 'next/image';
import { useLazyQuery } from '@apollo/client';
import { SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { CITIES_PRODUCT_FILTER } from '../../api/reviews';
import TourDropDown from './TourDropdown';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
import { useMediaQuery } from '../../layouts/NavBar';

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
  errorObject: Record<string, unknown>;
  setErrorObject: React.Dispatch<SetStateAction<Record<string, unknown>>>;
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
  setErrorStates,
  errorObject,
  setErrorObject
}: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <>
      <button
        className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center sm:px-3 py-3 rounded-[5px] lg:rounded-[10px] mt-5"
        onClick={() => setTourDropdownToggle(!tourDropdownToggle)}
      >
        <div className="flex justify-center items-center ">
          <span className="px-3">
            <Image
              src={'/locationIcon.svg'}
              width={mediaQuery ? 12 : 20}
              height={mediaQuery ? 12 : 20}
              alt="calendar image"
            />
          </span>
          <span
            className=" text-[10px] sm:[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] font-[500] text-[#333333]"
            onClick={() => setTourDropdownToggle(!cityDropdownToggle)}
          >
            {selectedCityProduct
              ? selectedCityProduct.length > 30
                ? `${selectedCityProduct.slice(0, 32)} ...`
                : selectedCityProduct
              : 'Find Your Tours'}
          </span>
        </div>
        <div className="px-3">
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
                errorObject={errorObject}
                setErrorObject={setErrorObject}
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
                errorObject={errorObject}
                setErrorObject={setErrorObject}
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
                errorObject={errorObject}
                setErrorObject={setErrorObject}
              />
            </>
          )}
        </div>
      </button>
      {errorObject.product && (
        // @ts-ignore
        <div className="text-red-400">{errorObject.product}</div>
      )}
    </>
  );
};

export default CityTours;
