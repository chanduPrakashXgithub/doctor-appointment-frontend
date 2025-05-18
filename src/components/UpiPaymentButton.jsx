import React from 'react';
import api from '../services/api';

function UpiPaymentButton({ appointmentId, doctorId }) {
  const handleUPIPayment = async () => {
    try {
      const { data } = await api.post('/payments/create-checkout-session', {
        appointmentId,
        doctorId,
        amount: 1, // 💸 only ₹1
      });

      window.location.href = data.url;
    } catch (err) {
      console.error("UPI Checkout failed:", err);
      alert("Failed to create UPI checkout session");
    }
  };

  return (
    <button onClick={handleUPIPayment} className="btn btn-warning mt-3">
      Pay ₹1 via UPI
    </button>
  );
}

export default UpiPaymentButton;
