import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ErrorToast } from "../toaster/ToasterContainer";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          import.meta.env.VITE_APP_SERVICE_URL
        }/verify-payment?payment_intent=${localStorage.getItem(
          "paymentIntentId"
        )}`, // Your redirect URL on successful payment
      },
    });

    if (error) {
      ErrorToast(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-auto">
      <PaymentElement className="w-full" />
      <AuthSubmitBtn text={"Proceed"} type={"submit"} loading={loading} />
    </form>
  );
};

export default StripeForm;
