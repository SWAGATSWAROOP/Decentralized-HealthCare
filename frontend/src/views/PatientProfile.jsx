import React from 'react';
import './PatientProfile.css';

const PatientProfile = ({ onClose }) => {
  return (
    <div className="user-profile-box">
      <h2>User Profile</h2>
      <div className="profile-field">
        <label>Username:</label>
        <span>{/* Add username value here */}</span>
      </div>
      <div className="profile-field">
        <label>First Name:</label>
        <span>{/* Add first name value here */}</span>
      </div>
      <div className="profile-field">
        <label>Last Name:</label>
        <span>{/* Add last name value here */}</span>
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <span>{/* Add email value here */}</span>
      </div>
      <div className="profile-field">
        <label>Phone no.:</label>
        <span>{/* Add phone number value here */}</span>
      </div>
      <div className="profile-field">
        <label>Health Status:</label>
        <span>{/* Add health status value here */}</span>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PatientProfile;
