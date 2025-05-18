import React, { useEffect, useState } from 'react';
import appointmentService from '../services/appointmentService';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await appointmentService.getMine();
        setAppointments(res.appointments || []);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    }

    fetchData();
  }, []);

  const handleCancel = async (id) => {
    try {
      await appointmentService.cancel(id);
      setAppointments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error("Cancellation failed", err);
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="container mt-5">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="mt-3">No appointments found.</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app._id}>
                <td>{app.doctorId?.name} ({app.doctorId?.specialization})</td>
                <td>{formatDate(app.date)}</td>
                <td>{app.startTime} - {app.endTime}</td>
                <td>{app.status}</td>
                <td>
                  {app.status !== 'cancelled' && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(app._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointments;
