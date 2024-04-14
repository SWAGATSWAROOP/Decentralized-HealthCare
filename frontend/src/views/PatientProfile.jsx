import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const PatientProfile = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilephoto, setProfilePhoto] = useState("/profilephoto.png");
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
      <div
        className="h-screen flex flex-col justify-center items-center bg-contain"
        style={{
          backgroundImage: `url(/profileback.jpg)`,
        }}
      >
        <div>
          <NavBar />
        </div>
        <div
          className={`mt-10 w-3/4 h-3/4 p-4 rounded-lg space-y-4 ${update ? "bg-white" : ""}`}
        >
          <div>
            <h1 className="text-center text-7xl mb-8">User Profile</h1>
            {!update ? (
              <div className="flex justify-center">
                <img
                  className="rounded-full h-40 w-40 border-black border-2 mb-8 hover:scale-110"
                  src={profilephoto}
                  alt=""
                />
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <span>Profile Photo : </span>
                  <input
                    className="outline-none"
                    type="file"
                    multiple={false}
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </div>
                <div className="space-x-2">
                  <button
                    className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                    onClick={() => changePhoto()}
                  >
                    Change Photo
                  </button>
                  <button
                    className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                    onClick={() => removePhoto()}
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="">
            <span>Name : </span>
            {!update ? (
              <span>{name}</span>
            ) : (
              <input
                className="outline-none col-4"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            )}
          </div>
          <div className="">
            <span>Email : </span>
            <span>{email}</span>
          </div>
          <div className="">
            <span>Phone no : </span>
            {!update ? (
              <span>{phone}</span>
            ) : (
              <input
                value={phone}
                className="outline-none col-4"
                onChange={(e) => setPhone(e.target.value)}
              />
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
              <div className="space-x-3">
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                  onClick={() => submit()}
                >
                  Submit Details
                </button>
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                  onClick={() => navigate("/user/changepass")}
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

export default PatientProfile;
