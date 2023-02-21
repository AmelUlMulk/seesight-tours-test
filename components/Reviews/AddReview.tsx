import React, { use } from 'react';
import Image from 'next/image';
import { SetStateAction, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
import CalendarDate from './CalendarDate';
import moment from 'moment';
import CitySelect from './CitySelect';
import CityTours from './CityTours';
interface IProps {
  dispModal: boolean;
  setDispModal: React.Dispatch<SetStateAction<boolean>>;
  citiesPageDropDown: Record<string, any>[] | undefined;
}
const AddReview = ({ dispModal, setDispModal, citiesPageDropDown }: IProps) => {
  const [reviewInfo, setReviewInfo] = useState<Record<string, string>>({
    name: '',
    title: '',
    description: ''
  });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [dispCalendar, setDispCalendar] = useState<boolean>(false);
  const [cityDropdown, setCityDropdown] = useState<boolean>(false);
  const [tourDropdown, setTourDropdown] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleSubmit = async (values: any) => {
    console.log('Submittied reviewInfo:', values);
    setReviewInfo(values);
  };
  console.log('selectedCity:', selectedCity);
  return (
    <div
      id="review-modal-wrapper"
      className="w-[100%] h-[100vh] fixed top-0 left-0  bg-modalWrapper flex justify-center items-center"
      onClick={() => setDispModal(!dispModal)}
    >
      <div
        id="review-modal"
        className="z-50 bg-[#FFFFFF]"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-10 py-5">
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
                />
              )}
            </button>

            <button
              className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
              onClick={() => {
                setCityDropdown(!cityDropdown);
                if (tourDropdown) {
                  setTourDropdown(false);
                }
              }}
              disabled={selectedCity === null}
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
                    setTourDropdown(!tourDropdown);
                    if (cityDropdown) {
                      setCityDropdown(false);
                    }
                  }}
                >
                  {selectedCity ? selectedCity : 'Choose A city?'}
                </span>
              </div>
              <div>
                <DropdownIcon onClick={() => setCityDropdown(!cityDropdown)} />
              </div>
              {cityDropdown && (
                <CitySelect
                  citiesPageDropdown={citiesPageDropDown}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  setCityDropdown={setCityDropdown}
                  cityDropdown={cityDropdown}
                />
              )}
            </button>
            {selectedCity && (
              <button
                className="w-[100%] relative bg-[#EEEEEE] flex justify-between items-center px-5 py-3 rounded-[15px] mt-5"
                onClick={() => setTourDropdown(!tourDropdown)}
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
                  <span onClick={() => setTourDropdown(!cityDropdown)}>
                    Find Your Tours
                  </span>
                </div>
                <div>
                  <DropdownIcon
                    onClick={() => setTourDropdown(!tourDropdown)}
                  />
                </div>
                {tourDropdown && (
                  <CityTours
                    citiesPageDropdown={citiesPageDropDown}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    setTourDropdown={setCityDropdown}
                    tourDropdown={cityDropdown}
                  />
                )}
              </button>
            )}

            <Formik
              initialValues={reviewInfo}
              validate={values => {
                const errors: any = {};
                if (!/^[a-zA-Z-\s]{0,30}$/.test(values.name)) {
                  errors.name = 'Enter Valid Name';
                } else if (!/^[a-zA-Z-\s]{0,30}$/.test(values.title)) {
                  errors.title = 'Invalid Title';
                } else if (values.description.length < 8) {
                  errors.description = 'Enter Atleast 8 Character Review';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label
                    htmlFor="name"
                    className="block text-[25px] text-[#4F4F4F] font-[500]"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="focus:outline-none bg-[#EEEEEE] py-5 px-3 w-[100%] rounded-[15px]"
                  />
                  <ErrorMessage
                    name="name"
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
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder="Write Your Review"
                    className="block focus:outline-none w-[100%] rounded-[15px] py-5 px-3 bg-[#EEEEEE] min-h-[150px] mt-5"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-400"
                  />
                  <button
                    className="py-2 px-10 focus:outline-none text-[25px] font-[500] bg-slate-400 rounded-[10px] mt-5"
                    type="submit"
                    disabled={isSubmitting}
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
