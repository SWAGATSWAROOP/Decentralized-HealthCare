import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { setSignedIn } from "../../../../slices/user.slice.js";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const check = async () => {
        const res = await axios.get("/check/check-auth").then().catch();
        if (res.data.success) {
          dispatch(setSignedIn());
        }
      };
      check();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.user.signedIn);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
