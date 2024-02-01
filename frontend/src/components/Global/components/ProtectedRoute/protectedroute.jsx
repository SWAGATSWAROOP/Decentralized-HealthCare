import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = sessionStorage.getItem("auth");
  console.log("Auth from localStorage:", auth);
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
