import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">HealthCare</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && role === 'patient' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">Doctors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointments">My Appointments</Link>
                </li>
              </>
            )}
            {token && role === 'doctor' && (
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/dashboard">Dashboard</Link>
              </li>
            )}
            {token && role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Admin Panel</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;