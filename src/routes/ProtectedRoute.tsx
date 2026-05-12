import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RootState {
  auth: {
    token: string | null;
  };
}

interface Props {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;