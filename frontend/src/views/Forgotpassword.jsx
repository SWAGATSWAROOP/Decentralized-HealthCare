import axios from "axios";
import { useState } from "react";

const forgotPasswordLink = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [link, setLink] = useState(false);
  const [button, setButton] = useState("Send OTP");

  const submitOTP = async () => {
    try {
      const res = await axios.post();
    } catch (error) {}
  };

  const getOTP = async () => {
    try {
      const res = await axios.post();
    } catch (error) {}
  };

  return (
    <>
      <div className="flex">
        <div>
          <image src="" alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            {link ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
    </>
  );
};
