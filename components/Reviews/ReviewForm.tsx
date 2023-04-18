import { useMutation } from '@apollo/client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { SetStateAction, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';
import { INSERT_REVIEW } from '../../api/reviews';
import { useMediaQuery } from '../../layouts/NavBar';
interface IProps {
  dispModal: boolean;
  setDispModal: React.Dispatch<SetStateAction<boolean>>;
  rating: number;
  submitReview: Record<string, unknown>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, unknown>>>;
  handleRating: (rate: number) => void;
  termsConditions: boolean;
  setTermsConditions: React.Dispatch<SetStateAction<boolean>>;
  errorStates: Record<string, boolean>;
  setErrorStates: React.Dispatch<SetStateAction<Record<string, boolean>>>;
  errorObject: Record<string, unknown>;
  setErrorObject: React.Dispatch<SetStateAction<Record<string, unknown>>>;
}
interface RatingFieldProps {
  field: Record<string, any>;
  setFieldValue: (fieldName: string, value: any) => void;
}
interface Props {
  isChecked: boolean;
}
const CheckBoxTextStyle = styled.p<Props>`
  opacity: ${props => (props.isChecked ? '1' : '0.5')};
`;
const errorMsgObject: Record<string, any> = {
  date: 'Tour date must be selected',
  cities: 'Tour city must be selected',
  product: 'Tour must be selected'
};
const ReviewForm = ({
  rating,
  setSubmitReview,
  submitReview,
  handleRating,
  termsConditions,
  setTermsConditions,
  errorStates,
  setErrorStates,
  errorObject,
  setErrorObject,
  setDispModal
}: IProps) => {
  const [reviewInfo, setReviewInfo] = useState<Record<string, any>>({
    traveller: '',
    title: '',
    review: '',
    rating: rating,
    checkbox: false
  });
  const mediaQuery = useMediaQuery(768);
  const [
    insertReview,
    { data: mutationData, loading: mutationLoading, error }
  ] = useMutation(INSERT_REVIEW);
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
        fillColor="orange"
        emptyColor="gray"
        SVGstyle={{ display: 'inline-block' }}
        allowFraction
        size={mediaQuery ? 25 : 40}
      />
    );
  };
  const handleCheck = () => {
    // setTermsConditions(!termsConditions);
    // setReviewInfo({
    //   ...reviewInfo,
    //   checkbox: !termsConditions
    // });
    const errObj: Record<string, any> = {};
    Object.keys(errorMsgObject).forEach(key => {
      setTermsConditions(false);
      if (!submitReview[key]) {
        errObj[key] = errorMsgObject[key];
      }
    });
    setErrorObject(errObj);
    if (Object.keys(errObj).length === 0) {
      setTermsConditions(!termsConditions);
      setReviewInfo({
        ...reviewInfo,
        checkbox: !termsConditions
      });
    }
  };
  const handleSubmit = async (values: any) => {
    setReviewInfo(values);
    delete submitReview.checkbox;
    await insertReview({
      variables: {
        data: {
          ...submitReview,
          published_at: new Date(),
          source: 'WEBSITE'
        }
      }
    });
    setDispModal(false);
  };
  return (
    <Formik
      initialValues={reviewInfo}
      validate={values => {
        setSubmitReview(prevState => {
          return {
            ...prevState,
            ...values
          };
        });
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
        } else if (!values.checkbox) {
          errors.review = 'Please Agree Our Terms & Conditions';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <label className="block text-[12px] md:text-[14px] xl:text-[16px] text-[#4F4F4F] font-[500] mt-3">
            Name
          </label>
          <Field
            id="traveller"
            name="traveller"
            type="text"
            placeholder="Name"
            autocomplete="off"
            required
            className="focus:outline-none bg-[#EEEEEE] text-[12px] md:text-[14px] xl:text-[16px] py-2 lg:py-3 px-3 w-[100%] rounded-[5px] lg:rounded-[10px] mt-1"
          />
          <ErrorMessage
            name="traveller"
            component="div"
            className="text-red-400"
          />

          <label className="block text-[12px] md:text-[14px] xl:text-[16px] text-[#4F4F4F] font-[500] mt-3">
            Title
          </label>
          <Field
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            autocomplete="off"
            required
            className="focus:outline-none bg-[#EEEEEE] text-[12px] md:text-[14px] xl:text-[16px] py-2 lg:py-3 px-3 w-[100%] rounded-[5px] lg:rounded-[10px] mt-1"
          />
          <ErrorMessage name="title" component="div" className="text-red-400" />

          <div>
            <label className="block text-[12px] md:text-[14px] xl:text-[16px] font-[500] text-[#4F4F4F] mt-3">
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
            className="block focus:outline-none w-[100%] rounded-[10px] py-2 lg:py-5 px-3 bg-[#EEEEEE] md:h-[120px] xl:h-[150px] min-h-[80px] mt-3 placeholder:text-[12px] lg:placeholder:text-[18px]"
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
              onChange={(e: any) => {
                handleCheck();
                setFieldValue('checkbox', e.target.checked);
              }}
              className="mt-2"
            />
            <CheckBoxTextStyle
              isChecked={termsConditions}
              className="text-[10px] text-justify lg:text-[14px] font-[500]"
            >
              I certify that this review is based on my experience and is my
              genuine opinion, and have not beet offered any incentive or
              payment origniating from the establishment to rewrite this review.
              I understand that a SeeSight Tours has a zero tolerance policy on
              fake reviews.
            </CheckBoxTextStyle>
          </div>
          <button
            className="py-2 px-10 focus:outline-none text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] font-[500] bg-slate-400 rounded-[10px] mt-5 "
            type="submit"
            // disabled={isSubmitting}
          >
            {mutationLoading ? 'loading...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
