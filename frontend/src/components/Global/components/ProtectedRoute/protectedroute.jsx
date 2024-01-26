import { useSelector } from "react-redux";
import NotFound from "../../../../views/not-found";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.signedIn);
  return isAuthenticated ? <>{children}</> : <NotFound />;
};

export default ProtectedRoute;
