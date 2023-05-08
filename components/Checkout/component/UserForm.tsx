import { PaymentElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { FormProps } from '../StripePayment';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';
import { PaxContext } from '../../../utils/checkoutContext';
import { useRouter } from 'next/router';

interface IProps extends FormProps {
  customerId: string;
}
const StyledPhoneInput = styled(PhoneInput)`
  input {
    font-size: 18px;

    padding: 0.5rem;
    color: black;
    border: 1px;
    border-radius: 4px;
    border: 1px solid #d1d5db;
    outline-width: 1px;

    outline-color: ${props => (props.valid ? 'none' : 'red')};
  }
  select {
    background: white;
    color: black;
    option {
      color: black;
    }
  }
`;
const StyledForm = styled.form``;

interface FORM {
  next: () => void;
}

const PaymentForm = ({ next }: FORM) => {
  //@ts-ignore
  const { updateUser, user } = useContext(PaxContext);

  const [name, setName] = useState<string>(user?.name ? user.name : '');

  const [email, setEmail] = useState<string>(user?.email ? user.email : '');

  const [phone, setPhone] = useState<string>(user?.phone ? user.phone : '');

  const [validPhone, setValidPhone] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    if (phone && phone.length > 1) {
      setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone]);

  const customerFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validPhone) return;
    updateUser({
      name,
      email,
      phone
    });
    next();
  };

  return (
    <div className=" w-full md:w-[46%]  text-black ">
      <StyledForm
        className="flex flex-col gap-3"
        id="main-form"
        onSubmit={e => customerFormHandler(e)}
      >
        <div className="flex flex-col    ">
          <span className=" font-semibold "> Name </span>
          <input
            type="text"
            className=" text-[18px] px-1 py-2 text-black border-gray-300 rounded border    "
            required
            value={name}
            onChange={e => setName(e.target.value)}
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="flex flex-col ">
          <span className=" font-semibold "> Email </span>
          <input
            className=" text-[18px] px-1 py-2 text-black border border-gray-300 rounded rounded-tr-lg"
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            minLength={2}
            maxLength={100}
          />
        </div>

        <div className="flex flex-col ">
          <span className={`${!validPhone && 'text-red-600'}   font-semibold `}>
            {' '}
            Phone{' '}
          </span>
          {}
          <StyledPhoneInput
            value={phone}
            onChange={setPhone}
            defaultCountry="CA"
            withCountryCallingCode
            international
            valid={validPhone}
          />
        </div>
        <div className="flex w-full justify-between mt-8  ">
          <button
            className=" bg-[#F15C5A]  py-3 rounded-md w-1/3 text-white   "
            onClick={e => {
              e.preventDefault();
              router.back();
            }}
          >
            {' '}
            Back{' '}
          </button>
          <button
            className="border-2 border-[#F15C5A]  py-3 rounded-md w-1/3  "
            type="submit"
          >
            Next
          </button>
        </div>
      </StyledForm>
    </div>
  );
};

export default PaymentForm;
