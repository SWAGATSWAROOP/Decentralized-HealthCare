import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFound from "../../../../views/Login.jsx";
import axios from "axios";
import { setSignedIn } from "../../../../slices/user.slice.js";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const check = async () => {
      const res = await axios.get("/check/check-auth");
      console.log(res);
      if (res.data.success) {
        dispatch(setSignedIn());
      }
    };
    check();
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.user.signedIn);
  return isAuthenticated ? <>{children}</> : <NotFound />;
};

export default ProtectedRoute;
