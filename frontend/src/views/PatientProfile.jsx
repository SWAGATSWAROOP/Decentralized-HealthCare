import React from "react";
import "./PatientProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
                className="outline-none border px-2 py-1 border-black"
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
            <span>Phone no:</span>
            {!update ? (
              <span>{phone}</span>
            ) : (
              <input type="number" value={phone} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
