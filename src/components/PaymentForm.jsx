import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../services/api';

function PaymentForm({ appointmentId, doctorId, amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const res = await api.post('/payments/process', {
      paymentMethodId: paymentMethod.id,
      appointmentId,
      doctorId,
    });

    if (res.data.success) {
      alert("Payment successful");
      onSuccess();
    } else {
      alert("Payment failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn btn-primary mt-3" type="submit">Pay ₹{amount}</button>
    </form>
  );
}

export default PaymentForm;
