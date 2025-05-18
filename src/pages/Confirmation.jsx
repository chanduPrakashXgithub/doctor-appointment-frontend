import React from 'react';
import { Link } from 'react-router-dom';

function Confirmation() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">✅ Appointment Confirmed & Paid</h2>
      <p className="lead mt-3">
        Your appointment has been successfully booked and payment received.
        <br />
        You will receive a WhatsApp message shortly. 📲
      </p>
      <Link to="/" className="btn btn-primary mt-4">
        Back to Home
      </Link>
    </div>
  );
}

export default Confirmation;
