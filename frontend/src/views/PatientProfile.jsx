import React from "react";
import "./PatientProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";

const PatientProfile = ({ onClose }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilephoto, setProfilePhoto] = useState("./profilephoto.png");
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/profile");
      console.log(res);
      if (res.data.success) {
        setname(res.data?.data?.user?.name);
        setEmail(res.data?.data?.user?.email);
        setPhone(res.data?.data?.user?.phoneno);
        if (res.data?.data?.user?.profilephoto) {
          setProfilePhoto(res.data?.data?.user?.profilephoto);
        }
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="user-profile-box">
      <div className="profile-field">
        <h2>User Profile</h2>
        <img className="rounded-full h-20 w-20" src={profilephoto} alt="" />
      </div>
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
      <div className="profile-field"></div>
      <button
        className="p-3 text-white bg-blue-600 border-none rounded-xl cursor-pointer text-{16px} hover:bg-red-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default PatientProfile;
