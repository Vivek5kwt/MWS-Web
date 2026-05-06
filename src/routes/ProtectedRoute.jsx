import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // if not logged in → redirect
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // if logged in → allow access
  return children;
};

export default ProtectedRoute;