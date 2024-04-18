import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./DNavbar";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("./profilephoto.png");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/org/profile");
        console.log(res);

        if (res.data.success) {
          setName(res.data?.data?.user?.name);
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

    fetchData();
  }, [update]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/org/update", {
        phoneno: phone,
        name,
        type,
        address,
      });

      if (res.data.success) {
        setName(res.data?.data?.user?.name);
        setPhone(res.data?.data?.user?.phoneno);
        alert("Updated Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("profilephoto", profilePhoto);
      const res = await axios.post("/org/updatephoto", formData);

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
      <div
        className="h-screen flex flex-col justify-center items-center bg-contain"
        style={{
          backgroundImage: `url(/profileback.jpg)`,
        }}
      >
        <NavBar />
        <div
          className={`mt-10 w-3/4 h-3/4 p-4 rounded-lg space-y-4 ${update ? "bg-white" : ""}`}
        >
          <div>
            <h1 className="text-center text-7xl mb-8">User Profile</h1>
            {!update ? (
              <div className="flex justify-center">
                <img
                  className="rounded-full h-40 w-40 border-black border-2 mb-8 hover:scale-110"
                  src={profilePhoto}
                  alt="Profile"
                />
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <span>Profile Photo : </span>
                  <input
                    className="outline-none"
                    type="file"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </div>
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                  onClick={() => handleChangePhoto()}
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>
          <div className="profile-info">
            <span>Name : </span>
            {!update ? (
              <span className="profile-value">{name}</span>
            ) : (
              <input
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>
          <div className="profile-info">
            <span>Email : </span>
            <span className="profile-value">{email}</span>
          </div>
          <div className="profile-info">
            <span>Phone no : </span>
            {!update ? (
              <span className="profile-value">{phone}</span>
            ) : (
              <input
                value={phone}
                className="profile-input"
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>
          <div className="profile-info">
            <span>Address : </span>
            {!update ? (
              <span className="profile-value">{address}</span>
            ) : (
              <textarea
                value={address}
                className="profile-input"
                onChange={(e) => setAddress(e.target.value)}
              />
            )}
          </div>
          <div className="profile-info">
            {!update ? (
              <span>
                Type : <span className="profile-value">{type}</span>
              </span>
            ) : (
              <div>
                <span>Type :</span>
                <select
                  value={type}
                  className="profile-input"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {!update ? (
              <button
                className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                onClick={() => setUpdate(true)}
              >
                Update Details
              </button>
            ) : (
              <div className="flex justify-center space-x-7">
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                  onClick={() => handleSubmit()}
                >
                  Submit Details
                </button>
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                  onClick={() => navigate("/org/changepass")}
                >
                  Change Password
                </button>
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
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

export default DoctorProfile;
