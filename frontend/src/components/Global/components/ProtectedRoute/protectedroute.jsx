import { Navigate } from "react-router-dom";
import { createContext } from "react";

const ProtectedRoute = ({ children }) => {
  const userContext = createContext(null);
  const auth = sessionStorage.getItem("auth");
  console.log("Auth from localStorage:", auth);
  return auth ? (
    <userContext.Provider>{children}</userContext.Provider>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
