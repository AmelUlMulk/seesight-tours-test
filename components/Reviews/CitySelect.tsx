import Image from 'next/image';
import { SetStateAction } from 'react';
import CityDropdown from './CityDropdown';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
import { useMediaQuery } from '../../layouts/NavBar';
import { MyErrorObject } from './Header';

interface IProps {
  citiesDropDown: Record<string, any>;
  selectedCity: string | null;
  setSelectedCity: React.Dispatch<SetStateAction<string | null>>;
  setCityDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  cityDropdownToggle: boolean;
  tourDropdownToggle: boolean;
  setTourDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
  errorStates: Record<string, boolean>;
  setErrorStates: React.Dispatch<SetStateAction<Record<string, boolean>>>;
  errorObject: MyErrorObject;
  setErrorObject: React.Dispatch<SetStateAction<MyErrorObject>>;
}

const CitySelect = ({
  citiesDropDown,
  selectedCity,
  setSelectedCity,
  setCityDropdownToggle,
  cityDropdownToggle,
  tourDropdownToggle,
  setTourDropdownToggle,
  submitReview,
  setSubmitReview,
  errorStates,
  setErrorStates,
  errorObject,
  setErrorObject
}: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <button
      className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center sm:px-3 py-3 lg:py-3  rounded-[5px] lg:rounded-[10px] mt-5"
      onClick={() => {
        setTourDropdownToggle(false);
        setCityDropdownToggle(!cityDropdownToggle);
      }}
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
          onClick={() => {
            setTourDropdownToggle(!tourDropdownToggle);
            if (cityDropdownToggle) {
              setCityDropdownToggle(false);
            }
          }}
          className=" text-[10px] sm:text-[14px] xl:text-[16px] font-[500] text-[#333333] text-start"
        >
          {selectedCity ? selectedCity : 'Choose A city?'}
        </span>
      </div>
      <div className="px-3">
        <DropdownIcon
          onClick={() => setCityDropdownToggle(!cityDropdownToggle)}
        />
      </div>
      {cityDropdownToggle && (
        <CityDropdown
          citiesDropDown={citiesDropDown}
          cityDropdownToggle={cityDropdownToggle}
          setCityDropdownToggle={setCityDropdownToggle}
          setSelectedCity={setSelectedCity}
          submitReview={submitReview}
          setSubmitReview={setSubmitReview}
          errorStates={errorStates}
          setErrorStates={setErrorStates}
          errorObject={errorObject}
          setErrorObject={setErrorObject}
        />
      )}
    </button>
  );
};

export default CitySelect;
