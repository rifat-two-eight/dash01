import { Navigate, useLocation } from "react-router";

const SetPasswordRoute = ({ children }) => {
  const { state } = useLocation();
  const resetToken = state?.token;
  return resetToken ? children : <Navigate to="/forgot-password" replace />;
};

export default SetPasswordRoute;