import React from "react";
import "./PatientProfile.css";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import NavBar from "./NavBar";

const PatientProfile = () => {
  const [update, setUpdate] = useState(false);
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

  const submit = async () => {
    try {
      const res = await axios.post("/profile/update", {
        email,
        phoneno: phone,
        name,
      });
      setUpdate(false);

      if (res.data.success) {
        setname(res.data?.data?.user?.name);
        setPhone(res.data?.data?.user?.phoneno);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="flex flex-col  justify-center items-center">
        <NavBar />
        <div className="user-profile-box mt-10">
          <div className="profile-field">
            <h2>User Profile</h2>
            <img className="rounded-full h-20 w-20" src={profilephoto} alt="" />
          </div>
          <div className="profile-field">
            <span>Name : </span>
            {!update ? (
              <span>{name}</span>
            ) : (
              <input
                className="outline-none"
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            )}
          </div>
          <div className="profile-field">
            <span>Email : </span>
            <span>{email}</span>
          </div>
          <div className="profile-field">
            <span>Phone no : </span>
            {!update ? (
              <span>{phone}</span>
            ) : (
              <input
                type="text"
                value={phone}
                className="outline-none"
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>
          <div className="flex justify-center">
            {!update ? (
              <button
                className="border-black border-2 p-2"
                onClick={() => setUpdate(true)}
              >
                Update Details
              </button>
            ) : (
              <button
                className="border-black border-2 p-2"
                onClick={() => submit()}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
