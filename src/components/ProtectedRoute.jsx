import { Navigate } from 'react-router-dom';

/**
 * Protected Route Component
 * Handles authentication and role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} props.allowedRoles - Array of allowed roles
 */
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      admin: '/admin/dashboard',
      doctor: '/doctor/dashboard',
      patient: '/patient/dashboard',
    };
    const redirectPath = dashboardRoutes[role] || '/login';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
