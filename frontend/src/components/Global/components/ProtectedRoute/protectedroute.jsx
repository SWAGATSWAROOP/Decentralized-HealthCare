import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../../../views/not-found";

const ProtectedRoute = ({ path, element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.signedIn);
  return (
    <Routes>
      <Route
        path={path}
        element={isAuthenticated ? <Component {...rest} /> : <NotFound />}
      />
    </Routes>
  );
};

export default ProtectedRoute;
