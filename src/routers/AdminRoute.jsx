import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/admin" />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/admin" />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
