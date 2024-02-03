import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordLink = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [link, setLink] = useState(false);
  const [button, setButton] = useState("Send OTP");
  const [userType, setUserType] = useState("");

  const submitOTP = async () => {
    try {
      const res = await axios.post();
      if (res.data.success) {
        navigate("/login", { replace: true });
      }
    } catch (error) {}
  };

  const getOTP = async () => {
    if (!userType) {
      return alert("Select User Type!!!");
    }
    if (userType === "Patient") {
      try {
        const res = await axios.get("/user/forgetpass");
        setLink(true);
        setButton("Submit OTP");
      } catch (error) {
        alert(alert("Unable to Send OTP"));
      }
    } else {
      try {
        const res = await axios.get();
        setLink(true);
        setButton("Submit OTP");
      } catch (error) {
        alert("Unable to Submit OTP");
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex w-3/4 border-black border-2">
          <div className="w-1/2 border-black border-r-2">
            <img src="/forgetpassword.jpg" alt="" />
          </div>
          <div className="w-1/2 p-4 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              {!link ? (
                <div className="mb-4">
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(event) => setUserType(event.target.value)}
                    className="outline-none"
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Organization">Organization</option>
                  </select>
                </div>
              ) : (
                <div className="mb-4">{userType}</div>
              )}
              {!link ? (
                <div className="mb-4">
                  <div>
                    Email :
                    <input
                      type="email"
                      value={email}
                      placeholder="Enter Your Email"
                      style={{ width: "20rem" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <span>Email : </span>
                  {email}
                </div>
              )}
              {link ? (
                <div className="mb-4">
                  <span>OTP : </span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
              ) : null}
              <div>
                <button
                  className="p-2 border-black border-2 bg-violet-700"
                  onClick={() => (link ? submitOTP() : getOTP())}
                >
                  {button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
