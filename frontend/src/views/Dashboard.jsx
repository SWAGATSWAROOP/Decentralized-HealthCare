import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import UserProfileBox from "./PatientProfile"; // Import the UserProfileBox component
import styles from "./Dashboard.module.css";
import axios from "axios";
import { setSignedIn } from "../slices/user.slice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    const check = async () => {
      const res = await axios.get("/check/check-auth");
      console.log(res);
      if (res.data.success) {
        dispatch(setSignedIn());
      }
    };
    check();
  }, [dispatch]);

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <NavBar onUserProfileClick={handleUserProfileClick} />
      <div className={styles.dashboardContent}>
        <h1>Welcome to the Patient Dashboard</h1>
        {/* Add other content here */}
      </div>

      {showUserProfile && (
        <UserProfileBox onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
};

export default Dashboard;
