// PatientProfile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./PatientProfile.css"; // Import CSS file

const PatientProfile = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilephoto, setProfilePhoto] = useState("/profilephoto.png");

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [update]);

  const submit = async () => {
    try {
      const res = await axios.post("/profile/update", {
        email,
        phoneno: phone,
        name,
      });

      if (res.data.success) {
        setname(res.data?.data?.user?.name);
        setPhone(res.data?.data?.user?.phoneno);
        alert("Updated Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  const removePhoto = async () => {
    try {
      const res = await axios.post("/user/removeprofile");

      if (res.data.success) {
        setProfilePhoto("/profilephoto.png");
        alert("Updated Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  
  const changePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("profilephoto", profilephoto);
      const res = await axios.post("/user/changephoto", formData);

      if (res.data.success) {
        setProfilePhoto(res.data?.data?.user?.profilephoto);
        alert("Updated Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="upload-container">
        <NavBar />
        <div className={`profile-container ${update ? "update-mode" : ""}`}>
          <h1 className="profile-title">User Profile</h1>
          <div className="profile-photo-container">
            {!update ? (
              <img
                className="profile-photo"
                src={profilephoto}
                alt=""
              />
            ) : (
              <div className="profile-photo-actions">
                <span>Profile Photo : </span>
                <input
                  className="profile-photo-input"
                  type="file"
                  multiple={false}
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                <div className="profile-photo-buttons">
                  <button
                    className="profile-photo-button"
                    onClick={() => changePhoto()}
                  >
                    Change Photo
                  </button>
                  <button
                    className="profile-photo-button"
                    onClick={() => removePhoto()}
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="profile-info">
            <span className="profile-label">Name : </span>
            {!update ? (
              <span className="profile-value">{name}</span>
            ) : (
              <input
                className="profile-input"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            )}
          </div>
          <div className="profile-info">
            <span className="profile-label">Email : </span>
            <span className="profile-value">{email}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Phone no : </span>
            {!update ? (
              <span className="profile-value">{phone}</span>
            ) : (
              <input
                className="profile-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>
          <div className="profile-buttons">
            {!update ? (
              <button
                className="profile-button"
                onClick={() => setUpdate(true)}
              >
                Update Details
              </button>
            ) : (
              <div className="profile-button-container">
                <button
                  className="profile-button"
                  onClick={() => submit()}
                >
                  Submit Details
                </button>
                <button
                  className="profile-button"
                  onClick={() => navigate("/user/changepass")}
                >
                  Change Password
                </button>
                <button
                  className="profile-button"
                  onClick={() => setUpdate(false)}
                >
                  Back To Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
