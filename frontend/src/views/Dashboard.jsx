import React, { useState } from "react";
import NavBar from "./NavBar";
import UserProfileBox from "./PatientProfile"; // Import the UserProfileBox component
import styles from "./Dashboard.module.css";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>
      <div className="mt-4">
        <NavBar onUserProfileClick={handleUserProfileClick} />
      </div>
      <div
        className={`${styles.dashboardContent} mt-10 ${showUserProfile ? "hidden" : ""}`}
      >
        <h1>Welcome to the Patient Dashboard</h1>
        {/* Add other content here */}
      </div>
      <div className="mt-4 z-10">
        {showUserProfile && (
          <UserProfileBox onClose={() => setShowUserProfile(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
