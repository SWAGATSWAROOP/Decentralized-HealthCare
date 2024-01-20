import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        element={isAuth ? <Component {...rest} /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default ProtectRoute;
