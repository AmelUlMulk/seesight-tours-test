import React, { use, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { SetStateAction, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';
import CitySelect from './CitySelect';
import CityTours from './CityTours';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CITIES_PRODUCT_FILTER, INSERT_REVIEW } from '../../api/reviews';
import DateSelect from './DateSelect';
import ReviewForm from './ReviewForm';
interface IProps {
  dispModal: boolean;
  setDispModal: React.Dispatch<SetStateAction<boolean>>;
  citiesPageDropDown: Record<string, any>[] | undefined;
  citiesDropDown: Record<string, any>;
  handleRating: (rate: number) => void;
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
}

const AddReview = ({
  dispModal,
  setDispModal,
  citiesPageDropDown,
  citiesDropDown,
  handleRating,
  rating,
  setRating
}: IProps) => {
  const [submitReview, setSubmitReview] = useState<Record<string, unknown>>({
    source: null
  });
  const [termsConditions, setTermsConditions] = useState<boolean>(false);
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({
    date: false,
    traveller: false,
    review: false,
    city: false,
    product: false
  });
  const [reviewInfo, setReviewInfo] = useState<Record<string, any>>({
    traveller: '',
    title: '',
    review: '',
    rating: rating
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

  // console.log('selectedDate:', selectedDate);
  // console.log('reviewInfo:', reviewInfo);
  console.log('submitReview:', submitReview);
  return (
    <div
      id="review-modal-wrapper"
      className="w-[100%] h-[100vh] fixed top-0 left-0 z-[2000000] bg-modalWrapper flex justify-center items-center"
      onClick={() => setDispModal(!dispModal)}
    >
      <div
        id="review-modal"
        className="z-50 bg-[#FFFFFF]"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-10 py-5 max-w-[600px]">
          <h2 className="text-[32px] font-[500]">
            Share your experience with us
          </h2>
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
            />

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
            />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
