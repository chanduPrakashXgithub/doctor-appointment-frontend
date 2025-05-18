import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import UpiPaymentButton from '../components/UpiPaymentButton';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointmentId, doctorId, amount = 1 } = location.state || {};

  if (!appointmentId || !doctorId) {
    return <p className="text-danger">Missing payment details.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm
          appointmentId={appointmentId}
          doctorId={doctorId}
          amount={amount}
          onSuccess={() => navigate('/confirmation')}
        />
      </Elements>
      <hr />
      <UpiPaymentButton appointmentId={appointmentId} doctorId={doctorId} />
    </div>
  );
}

export default Checkout;
