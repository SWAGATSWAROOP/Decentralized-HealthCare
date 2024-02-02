import axios from "axios";
import { useState } from "react";

export const ForgotPasswordLink = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [link, setLink] = useState(false);
  const [button, setButton] = useState("Send OTP");
  const [userType, setUserType] = useState("");

  const submitOTP = async () => {
    try {
      const res = await axios.post();
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
      } catch (error) {}
    } else {
      try {
        const res = await axios.get();
        setLink(true);
        setButton("Submit OTP");
      } catch (error) {}
    }
  };

  return (
    <>
      <div className="h-full w-full flex justify-center">
        <div className="flex h-1/2 w-1/2 justify-center border-black border-2">
          <div className="h-fit w-1/2 border-black border-2 border-r-2">
            <img src="/forgetpassword.jpg" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              {!link ? (
                <div>
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(event) => setUserType(event.target.value)}
                    className="form-select"
                    required
                  >
                    <option>Select User Type</option>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Organization">Organization</option>
                  </select>
                </div>
              ) : (
                <div>{userType}</div>
              )}
            </div>
            <div>
              {!link ? (
                <div>
                  <span>Email : </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <span>Email : </span>
                  {email}
                </div>
              )}
            </div>
            {link ? (
              <div>
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
    </>
  );
};
