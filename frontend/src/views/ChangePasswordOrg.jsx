import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./DNavbar";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { email } = useContext(userContext);
  useEffect(() => {
    if (!confirmPass) {
      setMessage("");
      return;
    }
    if (confirmPass != newPass) {
      setMessage("Invalid");
    } else setMessage("");
  }, [confirmPass]);

  const submit = async () => {
    try {
      const res = await axios.post("/org/updatepass", {
        email: email,
        oldPassword: oldPass,
        newPassword: newPass,
      });
      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Error in ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <NavBar />
        <div className="flex h-3/4 mt-6">
          <div className="w-1/2 border-black border-r-2">
            <img src="/changepass.jpg" alt="" />
          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <h1 className="text-4xl">Change Password</h1>
            <div className="flex flex-col justify-center items-center space-y-6">
              <div className="mt-4">
                <span>Old Password : </span>
                <input
                  value={oldPass}
                  type="password"
                  onChange={(e) => {
                    const s = e.target?.value?.trim();
                    setOldPass(s);
                  }}
                />
              </div>
              <div>
                <span>New Password : </span>
                <input
                  value={newPass}
                  type="password"
                  onChange={(e) => {
                    const s = e.target.value.trim();
                    setNewPass(s);
                  }}
                />
              </div>
              <div>
                <span>Confirm Password : </span>
                <input
                  value={confirmPass}
                  type="password"
                  onChange={(e) => {
                    const s = e.target.value.trim();
                    setConfirmPass(s);
                  }}
                />
                <div>{message}</div>
              </div>
            </div>
            <div className="mt-10 pl-4 pr-4 pt-2 pb-2 hover:scale-125 rounded-md bg-green-400">
              <button onClick={() => submit()}>Set Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
