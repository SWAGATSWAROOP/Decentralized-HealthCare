import React, { useState } from "react";
import DNavBar from "./DNavbar.jsx";
import UserProfileBox from "./DoctorProfile.jsx";
import styles from "./Dashboard.module.css";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  return (
    <>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>
      <div className={styles.dashboardContainer}>
        <DNavBar onUserProfileClick={handleUserProfileClick} />
        <div className={styles.dashboardContent}>
          <h1>Welcome to the Patient Dashboard</h1>
          {/* Add other content here */}
        </div>
        {showUserProfile && (
          <UserProfileBox onClose={() => setShowUserProfile(false)} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
