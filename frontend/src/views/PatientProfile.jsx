import React from "react";
import "./PatientProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";

const PatientProfile = ({ onClose }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/profile");
      console.log(res);
      if (res.data.success) {
        setname(res.data?.data?.user?.name);
        setEmail(res.data?.data?.user?.email);
        setPhone(res.data?.data?.user?.phoneno);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="user-profile-box">
      <h2>User Profile</h2>
      <div className="profile-field">
        <label>Name:</label>
        <span>{name}</span>
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <span>{email}</span>
      </div>
      <div className="profile-field">
        <label>Phone no.:</label>
        <span>{phone}</span>
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
