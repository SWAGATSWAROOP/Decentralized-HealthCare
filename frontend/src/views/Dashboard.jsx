import React, { useState } from 'react';
import NavBar from './NavBar';
import UserProfileBox from './PatientProfile'; // Import the UserProfileBox component
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);

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

      {showUserProfile && <UserProfileBox onClose={() => setShowUserProfile(false)} />}
    </div>
  );
};

export default Dashboard;
