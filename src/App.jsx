import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardDoctor from './pages/DashboardDoctor';
import DashboardPatient from './pages/DashboardPatient';
import DoctorList from './pages/DoctorList';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import Payment from './pages/Payment'; 
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Navbar from './components/NavBar';
import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT } from './utils/roles';

function App() {
  return (
    <>
      <Navbar />
      <Routes>

        {/* Default redirect or login */}
        <Route path="/" element={<Login />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role Protected routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={[ROLE_ADMIN]}>
            <DashboardAdmin />
          </ProtectedRoute>
        }/>
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={[ROLE_DOCTOR]}>
            <DashboardDoctor />
          </ProtectedRoute>
        }/>
        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRoles={[ROLE_PATIENT]}>
            <DashboardPatient />
          </ProtectedRoute>
        }/>

        <Route path="/doctors" element={
          <ProtectedRoute allowedRoles={[ROLE_ADMIN, ROLE_PATIENT]}>
            <DoctorList />
          </ProtectedRoute>
        }/>
        <Route path="/book-appointment" element={
          <ProtectedRoute allowedRoles={[ROLE_PATIENT]}>
            <BookAppointment />
          </ProtectedRoute>
        }/>
        <Route path="/appointments" element={
          <ProtectedRoute allowedRoles={[ROLE_PATIENT]}>
            <Appointments />
          </ProtectedRoute>
        }/>
        <Route path="/payment" element={
          <ProtectedRoute allowedRoles={[ROLE_PATIENT]}>
            <Payment />
          </ProtectedRoute>
        }/>

        {/* Open to all users who are navigating after payment */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />

        {/* 404 fallback */}
        <Route path="*" element={<div className="container mt-5 text-danger">404 - Page Not Found</div>} />

      </Routes>
    </>
  );
}

export default App;
