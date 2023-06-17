import { Navigate } from 'react-router';

const ProtectedRoutes = ({ children }) => {
  const userPreferences = localStorage.getItem('UserPreferences');
  if (userPreferences === null) return <Navigate to="/auth/login" replace />;
  else return children;
};

export default ProtectedRoutes;
