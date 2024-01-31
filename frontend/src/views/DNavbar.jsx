import React, { useState } from "react";
import "./NavBar.css";

function NavBar({ onUserProfileClick }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => onUserProfileClick()}>
            <span>Doctor's Profile</span>
            <span className="icon"></span>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => {
                  setClick(false);
                  onUserProfileClick(true);
                }}
              >
                User Profile
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => setClick(false)}>
                Patients List
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => setClick(false)}>
                Hospital Visits
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => setClick(false)}>
                Scheduled Appointments
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => setClick(false)}>
                Meetings
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
