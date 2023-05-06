import React from 'react';
import { PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
interface STRIPECHECKOUT {
  back: () => void;
  handleFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    elements: any,
    stripe: any
  ) => void;
  paymentLoading: boolean;
}

const StripeCheckout = ({
  handleFormSubmit,
  back,
  paymentLoading
}: STRIPECHECKOUT) => {
  const elements = useElements();
  const stripe = useStripe();
  return (
    <form
      className=" w-full  md:w-1/2"
      onSubmit={e => handleFormSubmit(e, elements, stripe)}
    >
      <PaymentElement id="payment-element" />

      <div
        className={`${
          paymentLoading ? ' justify-end   ' : 'justify-between'
        } w-full  flex w-full  mt-8`}
      >
        {!paymentLoading && (
          <button
            className=" bg-[#F15C5A]  py-3 rounded-md w-1/3 text-white   "
            onClick={() => back()}
          >
            {' '}
            Back{' '}
          </button>
        )}
        <button
          className="border-2 border-[#F15C5A]  py-3 rounded-md w-1/3  "
          type="submit"
        >
          {paymentLoading ? (
            <span className="animate-pulse">Processing</span>
          ) : (
            'Pay'
          )}
        </button>
      </div>
      {paymentLoading && (
        <span className="text-red-500">
          Please do not navigate away from this page or close your browser while
          your payment is being processed. Doing so may result in an incomplete
          or failed transaction. Please wait until the payment processing is
          complete and you are redirected to a confirmation page. Thank you for
          your patience and understanding.
        </span>
      )}
    </form>
  );
};

export default StripeCheckout;
