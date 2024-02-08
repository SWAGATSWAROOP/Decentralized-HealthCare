import { useState, useEffect } from "react";
import NavBar from "./NavBar";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  useEffect(() => {
    if (!newPass) return;
    if (oldPass != newPass) {
      setMessage("Invalid");
    } else setMessage("");
  }, [newPass]);
  return (
    <>
      <div className="flex justify-center">
        <NavBar />
        <div className="flex flex-col">
          <div className="w-1/2 border-black border-r-2">
            <img src="/forgetpassword.jpg" alt="" />
          </div>
          <div className="flex justify-center items-center">
            <h1>Change Password</h1>
            <div className="flex-col">
              <span>Old Password : </span>
              <input
                value={oldPass}
                onChange={(e) => {
                  const s = e.target?.value?.trim();
                  setOldPass(s);
                }}
              />
            </div>
            <div className="flex-col">
              <span>New Password : </span>
              <input
                value={newPass}
                onChange={(e) => {
                  const s = e.target.value.trim();
                  setNewPass(s);
                }}
              />
            </div>
            <div className="flex-col">
              <span>Confirm Password : </span>
              <input
                value={confirmPass}
                onChange={(e) => {
                  const s = e.target.value.trim();
                  setConfirmPass(s);
                }}
              />
              <div>{message}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
