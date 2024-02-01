import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSignedIn } from "../../../../slices/user.slice.js";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  if (!isAuthenticated) navigate("/login", { replace: true });
  return <>{children}</>;
};

export default ProtectedRoute;
