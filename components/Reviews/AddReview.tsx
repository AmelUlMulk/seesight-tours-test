import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { SetStateAction, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';
import CitySelect from './CitySelect';
import CityTours from './CityTours';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CITIES_PRODUCT_FILTER, INSERT_REVIEW } from '../../api/reviews';
import styled from 'styled-components';
import DateSelect from './DateSelect';
import ReviewForm from './ReviewForm';
import ErrorDisp from './ErrorDisp';
import CrossButtonIcon from '../../assets/svg/radix-icons_cross-2.svg';
import { useMediaQuery } from '../../layouts/NavBar';
import { MyErrorObject } from './Header';
interface IProps {
  dispModal: boolean;
  setDispModal: React.Dispatch<SetStateAction<boolean>>;
  citiesPageDropDown: Record<string, any>[] | undefined;
  citiesDropDown: Record<string, any>;
  handleRating: (rate: number) => void;
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
  errorObject: MyErrorObject;
  setErrorObject: React.Dispatch<SetStateAction<MyErrorObject>>;
}

const AddReview = ({
  dispModal,
  setDispModal,
  citiesPageDropDown,
  citiesDropDown,
  handleRating,
  rating,
  setRating,
  errorObject,
  setErrorObject
}: IProps) => {
  const [submitReview, setSubmitReview] = useState<Record<string, unknown>>({
    source: null
  });
  const [termsConditions, setTermsConditions] = useState<boolean>(false);
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({
    date: true,
    traveller: true,
    review: true,
    city: true,
    product: false
  });

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCityProduct, setSelectedCityProduct] = useState<string | null>(
    null
  );
  const [dispCalendar, setDispCalendar] = useState<boolean>(false);
  const [cityDropdownToggle, setCityDropdownToggle] = useState<boolean>(false);
  const [tourDropdownToggle, setTourDropdownToggle] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>();
  const mediaQuery = useMediaQuery(640);
  const [fetchCityTours, { data: { cities } = [] }] = useLazyQuery(
    CITIES_PRODUCT_FILTER
  );
  useEffect(() => {
    fetchCityTours({
      variables: {
        filter: {
          name: selectedCity
        }
      }
    });
  }, [selectedCity]);
  useEffect(() => {
    setSelectedCityProduct('');
    setSubmitReview(prevState => {
      return {
        ...submitReview,
        product: ''
      };
    });
  }, [selectedCity]);
  return (
    <div
      id="review-modal-wrapper"
      className="w-[100%] h-[100vh] fixed top-0 left-0 z-[100] bg-modalWrapper flex justify-center items-start"
      onClick={() => setDispModal(!dispModal)}
    >
      <div
        id="review-modal"
        className=" bg-[#FFFFFF] w-[78%] sm:w-[70%] lg:w-[40%] mt-24 sm:mt-28 lg:mt-32 absolute mb-10"
        onClick={e => {
          e.stopPropagation();
          setDispCalendar(false);
        }}
      >
        <div
          className="hover:cursor-pointer w-6 ml-auto mr-3 mt-2"
          onClick={() => setDispModal(false)}
        >
          <Image
            src="/radix-icons_cross-2.svg"
            width={mediaQuery ? 20 : 30}
            height={mediaQuery ? 20 : 30}
            alt="cross-button"
          />
        </div>
        <div className="px-8 lg:px-16 pb-5 max-h-[75vh] xsm:max-h-[80vh] 2xl:max-h-[85vh] overflow-auto">
          <h2 className="text-[14px] md:text-[16px] lg:text[18px] xl:text-[22px] font-[500]">
            Share your experience with us
          </h2>
          {/* @ts-ignore */}
          <div className="flex flex-col">
            <DateSelect
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dispCalendar={dispCalendar}
              setDispCalendar={setDispCalendar}
              submitReview={submitReview}
              setSubmitReview={setSubmitReview}
              errorStates={errorStates}
              setErrorStates={setErrorStates}
              errorObject={errorObject}
              setErrorObject={setErrorObject}
              cityDropdownToggle={cityDropdownToggle}
              setCityDropdownToggle={setCityDropdownToggle}
              tourDropdownToggle={tourDropdownToggle}
              setTourDropdownToggle={setTourDropdownToggle}
            />
            {errorObject.date && (
              <div className="text-red-400 text-[10px] sm:text-[14px] lg-text-[18px]">
                {errorObject.date}
              </div>
            )}
            <CitySelect
              citiesDropDown={citiesDropDown}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              cityDropdownToggle={cityDropdownToggle}
              setCityDropdownToggle={setCityDropdownToggle}
              tourDropdownToggle={tourDropdownToggle}
              setTourDropdownToggle={setTourDropdownToggle}
              submitReview={submitReview}
              setSubmitReview={setSubmitReview}
              errorStates={errorStates}
              setErrorStates={setErrorStates}
              errorObject={errorObject}
              setErrorObject={setErrorObject}
            />
            {errorObject.cities && (
              <div className="text-red-400 text-[10px] sm:text-[14px] lg-text-[18px]">
                {/* @ts-ignore */}
                {errorObject.cities}
              </div>
            )}
            {selectedCity && (
              <CityTours
                cities={cities}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedCityProduct={selectedCityProduct}
                setSelectedCityProduct={setSelectedCityProduct}
                cityDropdownToggle={cityDropdownToggle}
                setCityDropdownToggle={setCityDropdownToggle}
                tourDropdownToggle={tourDropdownToggle}
                setTourDropdownToggle={setTourDropdownToggle}
                submitReview={submitReview}
                setSubmitReview={setSubmitReview}
                errorStates={errorStates}
                setErrorStates={setErrorStates}
                errorObject={errorObject}
                setErrorObject={setErrorObject}
              />
            )}
            <ReviewForm
              rating={rating}
              submitReview={submitReview}
              setSubmitReview={setSubmitReview}
              handleRating={handleRating}
              termsConditions={termsConditions}
              setTermsConditions={setTermsConditions}
              errorStates={errorStates}
              setErrorStates={setErrorStates}
              errorObject={errorObject}
              setErrorObject={setErrorObject}
              dispModal={dispModal}
              setDispModal={setDispModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
