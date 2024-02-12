import { Navigate } from "react-router-dom";
import { createContext } from "react";

export const userContext = createContext(null);

const ProtectedRoute = ({ children }) => {
  const auth = sessionStorage.getItem("auth");
  const email = sessionStorage.getItem("email");
  console.log("Auth from localStorage:", auth);
  return auth ? (
    <userContext.Provider value={{ auth, email }}>
      {children}
    </userContext.Provider>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
