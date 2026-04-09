import React, { type JSX } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Default Stripe key - apps should provide via env
const stripeKey = process.env.REACT_APP_STRIPE_KEY || 'pk_test_default';
const stripePromise = loadStripe(stripeKey);

const StripeWrapper: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <Elements key={config.stripeKey} stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
