import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./DNavbar";

const DocterProfile = () => {
  const [update, setUpdate] = useState(false);
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
      <div className="outer-div bg-green-500 flex flex-col justify-center items-center">
        <NavBar />
        <div className="mt-10 w-3/4 h-3/4 bg-white p-4 rounded-lg space-y-4">
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
                <button
                  className="border-black border-2 p-2 bg-blue-400 hover:scale-110"
                  onClick={() => changePhoto()}
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>
          <div className="">
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

export default DocterProfile;
