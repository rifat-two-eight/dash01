import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();
  return token ? children : <Navigate to="/login" replace state={{ from: pathname }} />;
};

export default PrivateRoute;