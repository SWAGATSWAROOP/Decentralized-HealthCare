import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignedOut } from "../slices/user.slice.js";
import "./NavBar.css";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const res = await axios.post("/user/logout");
      if (res.data.success) {
        dispatch(setSignedOut());
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
              <div className="nav-links" onClick={() => {}}>
                Upload Reports
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/access-history")}
              >
                Data Access
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => {}}>
                Doctors Consulted
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
