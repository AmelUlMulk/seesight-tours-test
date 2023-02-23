import Image from 'next/image';
import { SetStateAction } from 'react';
import CityDropdown from './CityDropdown';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';

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
  setErrorStates
}: IProps) => {
  // console.log('citySelectData:', citiesDropDown);
  return (
    <button
      className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
      onClick={() => {
        setCityDropdownToggle(!cityDropdownToggle);
        if (tourDropdownToggle) {
          setTourDropdownToggle(false);
        }
      }}
    >
      <div className="flex justify-center items-center pr-[11rem]">
        <span className="px-3">
          <Image
            src={'/locationIcon.svg'}
            width={33}
            height={33}
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
        >
          {selectedCity ? selectedCity : 'Choose A city?'}
        </span>
      </div>
      <div>
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
        />
      )}
    </button>
  );
};

export default CitySelect;
