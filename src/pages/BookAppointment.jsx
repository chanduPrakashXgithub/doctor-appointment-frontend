import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import appointmentService from '../services/appointmentService';
import doctorService from '../services/doctorService';

const formatTime = (time24) => {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = ((h + 11) % 12 + 1);
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const add30Minutes = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + 30);
  return date.toTimeString().slice(0, 5);
};

function BookAppointment() {
  const query = new URLSearchParams(useLocation().search);
  const doctorId = query.get('doctor');
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDoctor() {
      const res = await doctorService.getDoctorById(doctorId);
      setDoctor(res);
    }
    if (doctorId) fetchDoctor();
  }, [doctorId]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const startTime = formatTime(time);
    const endTime = formatTime(add30Minutes(time));

    try {
      const res = await appointmentService.book({
        doctorId,
        date,
        startTime,
        endTime,
      });

      navigate('/checkout', {
        state: {
          appointmentId: res.appointment._id,
          doctorId,
          amount: doctor.fees || 500,
        }
      });
    } catch (err) {
      if (err?.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Booking failed");
      }
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Book Appointment</h2>
      {doctor && (
        <div className="alert alert-info">
          Booking with: <strong>{doctor.name}</strong> ({doctor.specialization})
        </div>
      )}
      <form onSubmit={handleBook}>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" value={date}
                 onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Time</label>
          <input type="time" className="form-control" value={time}
                 onChange={e => setTime(e.target.value)} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Booking...' : 'Book & Pay'}
        </button>
      </form>
    </div>
  );
}
export default BookAppointment;
