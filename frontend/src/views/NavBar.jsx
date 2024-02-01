import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div
            className="nav-logo h-full flex items-center"
            onClick={() => navigate("/dashbaord")}
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
              <div className="nav-links" onClick={() => {}}>
                Upload Reports
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/access-history")}
              >
                Data Access History
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => {}}>
                Doctors Consulted
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => {}}>
                Health Insurance Policies
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
