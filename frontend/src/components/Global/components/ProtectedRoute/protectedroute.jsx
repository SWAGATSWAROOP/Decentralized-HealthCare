import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Login from "../../../../views/Login.jsx";
import axios from "axios";
import { setSignedIn } from "../../../../slices/user.slice.js";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const check = async () => {
      const res = await axios.get("/check/check-auth");

      if (res.data.success) {
        dispatch(setSignedIn());
      }
    };
    check();
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.user.signedIn);
  return isAuthenticated ? <>{children}</> : <Login />;
};

export default ProtectedRoute;
