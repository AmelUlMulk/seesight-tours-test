import { useStripe, useElements } from '@stripe/react-stripe-js';
const PaymentForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const paymentHandler = async (e: any) => {
    e.preventDefault();
    if (!stripe || !element) {
      return;
    }
  };
  return <div>Payment Form</div>;
};

export default PaymentForm;
