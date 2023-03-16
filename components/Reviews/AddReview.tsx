import React, { use, useEffect } from 'react';
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
interface IProps {
  dispModal: boolean;
  setDispModal: React.Dispatch<SetStateAction<boolean>>;
  citiesPageDropDown: Record<string, any>[] | undefined;
  citiesDropDown: Record<string, any>;
  handleRating: (rate: number) => void;
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
  errorObject: Record<string, unknown>;
  setErrorObject: React.Dispatch<SetStateAction<Record<string, unknown>>>;
}
const ReviewModal = styled.div`
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -40%);
  @media (max-width: 1280px) {
    top: 7%;
  }
  @media (max-width: 640px) {
  }
`;

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
      className="w-[100%] h-[100vh] fixed top-0 left-0 z-20 bg-modalWrapper flex justify-center items-start"
      onClick={() => setDispModal(!dispModal)}
    >
      <div
        id="review-modal"
        className="z-50 bg-[#FFFFFF] w-[78%] sm:w-[70%] mt-24 sm:mt-32 lg:mt-36"
        onClick={e => {
          e.stopPropagation();
          setDispCalendar(false);
        }}
      >
        <div className="px-6 lg:px-10 py-5 max-h-[75vh] xsm:max-h-[80vh] sm:max-h-[86vh] lg:max-h-[84vh] overflow-y-scroll">
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
              // @ts-ignore
              <div className="text-red-400">{errorObject.date}</div>
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
              <div className="text-red-400 text-[12px] sm:text-[14px] lg-text-[18px]">
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
