import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post("/user/logout");
      if (res.data.success) {
        sessionStorage.clear();
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div
            className="nav-logo h-full flex items-center"
            onClick={() => navigate("/dashboard")}
          >
            <div>Patient's DashBoard</div>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/user/profile")}
              >
                User Profile
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/user/upload-documents")}
              >
                Upload Reports
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/user/getdocters")}
              >
                Data Access
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/user/documents")}
              >
                My Documents
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => logout()}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
