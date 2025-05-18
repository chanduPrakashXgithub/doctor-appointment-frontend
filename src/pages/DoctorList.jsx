import React, { useState, useEffect } from 'react';
import doctorService from '../services/doctorService';

function DoctorList() {
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await doctorService.getDoctors();
        setDoctors(res); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }

    fetchDoctors();
  }, []);

  const filtered = doctors.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Doctors</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search doctors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Specialization</th><th></th></tr>
        </thead>
        <tbody>
          {filtered.map(doc => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>
                <a href={`/book-appointment?doctor=${doc._id}`} className="btn btn-success btn-sm">
                  Book
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
