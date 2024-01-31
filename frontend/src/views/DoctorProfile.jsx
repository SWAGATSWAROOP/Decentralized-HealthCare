import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PatientProfile.css";

const PatientProfile = ({ onClose }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
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
          setProfilePhoto(res.data?.data?.user?.profilephoto);
          setAddress(res.data?.data?.user?.address);
          setType(res.data?.data?.user?.type);
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
          <label>Phone no:</label>
          <span>{phone}</span>
        </div>
        <div className="profile-field flex-col">
          <label>Address:</label>
          <div>{address}</div>
        </div>
        <div className="profile-field">
          <label>Type:</label>
          <span>{type}</span>
        </div>
        <button
          className="p-3 text-white bg-blue-600 border-none rounded-xl cursor-pointer text-{16px} hover:bg-red-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default PatientProfile;
