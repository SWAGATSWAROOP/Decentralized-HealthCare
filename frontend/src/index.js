import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./style.css";
import Home from "./views/home.jsx";
import NotFound from "./views/not-found.jsx";
import LoginPage from "./views/Login.jsx";
import RegisterPage from "./views/Register.jsx";
import Dashboard from "./views/Dashboard.jsx";
import ProtectedRoute from "./components/Global/components/ProtectedRoute/protectedroute.jsx";
import AuditAcess from "./views/AuditAccessControls.jsx";
import DDashboard from "./views/DDashboard.jsx";

import "./assets/assets/css/font-awesome.min.css";
import "./assets/assets/css/style.css";

// Importing store
import { store } from "./store/store.js";
// importing Provider from react redux
import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/access-history"
          element={
            <ProtectedRoute>
              <AuditAcess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ddashboard"
          element={
            <ProtectedRoute>
              <DDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="306989628878-1ac30rkduv4bm4qqse143c52eomo1660.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
