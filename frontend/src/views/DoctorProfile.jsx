import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PatientProfile.css";

const PatientProfile = ({ onClose }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilephoto, setProfilePhoto] = useState("./profilephoto.png");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/org/profile");
        console.log(res);

        if (res.data.success) {
          setname(res.data?.data?.user?.name);
          setEmail(res.data?.data?.user?.email);
          setPhone(res.data?.data?.user?.phoneno);
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect will run once on mount

  return (
    <>
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
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default PatientProfile;
