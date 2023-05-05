import { PaymentElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { FormProps } from '../StripePayment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import Summary from './summary';

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
  // console.log('productId:', productId);
  const [phone, setPhone] = useState<string>('');
  const [validPhone, setValidPhone] = useState<boolean>(true);

  useEffect(() => {
    if (phone && phone.length > 1) {
      setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone]);

  return (
    <div className=" w-[46%]  text-black ">
      <StyledForm
        className="flex flex-col gap-3"
        id="main-form"
        // onSubmit={e => paymentHandler(e)}
      >
        <div className="flex flex-col   ">
          <span> Name </span>
          <input
            type="text"
            className=" text-[18px] px-1 py-2 text-black border-gray-300 rounded border    "
            required
            /*  value={customerDetails.name}
                onChange={e =>
                  setCustomerDetails({
                    ...customerDetails,
                    name: e.target.value
                  })
                } */
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="flex flex-col ">
          <span> Email </span>
          <input
            className=" text-[18px] px-1 py-2 text-black border border-gray-300 rounded rounded-tr-lg"
            type="email"
            /* value={customerDetails.email}
                required
                onChange={e =>
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value
                  })
                } */
            minLength={2}
            maxLength={100}
          />
        </div>

        <div className="flex flex-col ">
          <span className={`${!validPhone && 'text-red-600'}`}> Phone </span>
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
        <div className="flex w-full justify-between  ">
          <button className=" bg-[#F15C5A]  py-3 rounded-md w-1/3 text-white   ">
            {' '}
            Back{' '}
          </button>
          <button className="border-2 border-[#F15C5A]  py-3 rounded-md w-1/3  ">
            Next
          </button>
        </div>
      </StyledForm>
    </div>
  );
};

export default PaymentForm;
