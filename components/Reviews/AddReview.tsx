import React, { use, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { SetStateAction, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
import CalendarDate from './CalendarDate';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';
import CitySelect from './CitySelect';
import CityTours from './CityTours';
interface IProps {
  dispModal: boolean;
  setDispModal: React.Dispatch<SetStateAction<boolean>>;
  citiesPageDropDown: Record<string, any>[] | undefined;
  citiesDropDown: Record<string, any>;
  handleRating: (rate: number) => void;
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
}
interface Props {
  isChecked: boolean;
}
interface RatingFieldProps {
  field: Record<string, any>;
  setFieldValue: (fieldName: string, value: any) => void;
}
const CheckBoxTextStyle = styled.p<Props>`
  opacity: ${props => (props.isChecked ? '1' : '0.5')};
`;
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
  const [errorObject, setErrorObject] = useState<Record<string, unknown>>({});
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

  const RatingField = ({ field, setFieldValue }: RatingFieldProps) => {
    const { name, value } = field;
    const handleRate = (rate: number) => {
      handleRating(rate);
      setFieldValue(name, rate);
    };

    return (
      <Rating
        onClick={handleRate}
        initialValue={value > 0 ? value : 0}
        transition
        fillColor="orange"
        emptyColor="gray"
        SVGstyle={{ display: 'inline-block' }}
        allowFraction
      />
    );
  };

  const handleCheck = () => {
    setTermsConditions(!termsConditions);
  };
  const handleSubmit = async (values: any) => {
    console.log('Submit Call:', values);
    setReviewInfo(values);
  };

  // console.log('selectedDate:', selectedDate);
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
            <button
              className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
              onClick={() => setDispCalendar(!dispCalendar)}
            >
              <div className="flex justify-center items-center pr-[11rem]">
                <span className="px-3">
                  <Image
                    src={'/calendar.svg'}
                    width={33}
                    height={33}
                    alt="calendar image"
                  />
                </span>
                <span>
                  {selectedDate
                    ? moment(selectedDate).format('MMM Do YYYY')
                    : 'When did you go?'}
                </span>
              </div>
              <div>
                <DropdownIcon />
              </div>
              {dispCalendar && (
                <CalendarDate
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  dispCalendar={dispCalendar}
                  setDispCalendar={setDispCalendar}
                  submitReview={submitReview}
                  setSubmitReview={setSubmitReview}
                />
              )}
            </button>

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
                <CitySelect
                  citiesPageDropdown={citiesPageDropDown}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  setCityDropdownToggle={setCityDropdownToggle}
                  cityDropdownToggle={cityDropdownToggle}
                  citiesDropDown={citiesDropDown}
                  submitReview={submitReview}
                  setSubmitReview={setSubmitReview}
                />
              )}
            </button>
            {selectedCity && (
              <button
                className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
                onClick={() => setTourDropdownToggle(!tourDropdownToggle)}
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
                    onClick={() => setTourDropdownToggle(!cityDropdownToggle)}
                  >
                    {selectedCityProduct
                      ? selectedCityProduct
                      : ' Find Your Tours'}
                  </span>
                </div>
                <div>
                  <DropdownIcon
                    onClick={() => setTourDropdownToggle(!tourDropdownToggle)}
                  />
                </div>
                {tourDropdownToggle && (
                  <CityTours
                    citiesPageDropdown={citiesPageDropDown}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    setTourDropdown={setCityDropdownToggle}
                    tourDropdown={cityDropdownToggle}
                    submitReview={submitReview}
                    setSubmitReview={setSubmitReview}
                  />
                )}
              </button>
            )}

            <Formik
              initialValues={reviewInfo}
              validate={values => {
                console.log('values:', values);
                const errors: any = {};
                if (
                  !/^[a-zA-Z-\s]{0,30}$/.test(values.name) ||
                  values.traveller === ''
                ) {
                  errors.traveller = 'Enter Valid Name';
                } else if (
                  !/^[a-zA-Z-\s]{0,30}$/.test(values.title) ||
                  values.title === ''
                ) {
                  errors.title = 'Invalid Title';
                } else if (values.rating === 0) {
                  errors.rating = 'Please Select Rating';
                } else if (values.review.length < 8) {
                  errors.review = 'Enter Atleast 8 Character Review';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <label
                    htmlFor="name"
                    className="block text-[25px] text-[#4F4F4F] font-[500]"
                  >
                    Name
                  </label>
                  <Field
                    id="traveller"
                    name="traveller"
                    type="text"
                    placeholder="Name"
                    className="focus:outline-none bg-[#EEEEEE] py-5 px-3 w-[100%] rounded-[15px]"
                  />
                  <ErrorMessage
                    name="traveller"
                    component="div"
                    className="text-red-400"
                  />

                  <label
                    htmlFor="title"
                    className="block text-[25px] text-[#4F4F4F] font-[500] "
                  >
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="focus:outline-none bg-[#EEEEEE] py-5 px-3 w-[100%] rounded-[15px]"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-400"
                  />

                  <div>
                    <label className="block text-[26px] font-[500] text-[#4F4F4F]">
                      Rating
                    </label>
                    <Field
                      name="rating"
                      component={RatingField}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-red-400"
                  />

                  <Field
                    id="review"
                    name="review"
                    as="textarea"
                    placeholder="Write Your Review"
                    className="block focus:outline-none w-[100%] rounded-[15px] py-5 px-3 bg-[#EEEEEE] min-h-[150px] mt-5"
                  />
                  <ErrorMessage
                    name="review"
                    component="div"
                    className="text-red-400"
                  />
                  <div className="flex items-start gap-3 pt-3">
                    <Field
                      type="checkbox"
                      name="termsConditions"
                      checked={termsConditions}
                      onChange={handleCheck}
                      className="mt-2"
                    />
                    <CheckBoxTextStyle
                      isChecked={termsConditions}
                      className="text-[18px] font-[500]"
                    >
                      I certify that this review is based on my experience and
                      is my genuine opinion, and have not beet offered any
                      incentive or payment origniating from the establishment to
                      rewrite this review. I understand that a SeeSight Tours
                      has a zero tolerance policy on fake reviews.
                    </CheckBoxTextStyle>
                  </div>
                  <button
                    className="py-2 px-10 focus:outline-none text-[25px] font-[500] bg-slate-400 rounded-[10px] mt-5"
                    type="submit"
                    // disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
