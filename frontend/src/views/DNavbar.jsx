import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post("/org/logout");
      if (res.data.success) {
        navigate("/login");
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
            onClick={() => navigate("/ddashboard")}
          >
            <div>Doctor's DashBoard</div>
          </div>
          <ul className="nav-menu">
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
                Patients Data
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => {}}>
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
