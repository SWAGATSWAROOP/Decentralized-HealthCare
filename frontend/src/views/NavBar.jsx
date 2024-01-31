import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo h-full flex items-center" onClick={() => {}}>
            <div>Patient's Profile</div>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/org/profile")}
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

          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon"></span>
            ) : (
              <span className="icon"></span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
