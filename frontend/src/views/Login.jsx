import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignedIn } from "../slices/user.slice";
import { Helmet } from "react-helmet";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [emailMessage, setEmailMessage] = useState("Invalid");
  const [validEmailVisiblity, setValidEmailVisiblity] = useState("invisible");

  // Google sign in for users
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const res = await axios.post("/user/google-signin", {
        // backend that will exchange the code
        code,
      });

      if (res.data.success) {
        dispatch(setSignedIn());
        navigate("/dashboard", { replace: true });
      } else {
        alert("Error in Logging in");
      }
    },
    flow: "auth-code",
  });

  const submitTo = async (event) => {
    event.preventDefault();
    if (type === "Patient") {
      try {
        const res = await axios.post("/user/login", {
          email: email,
          password: password,
        });

        if (res.data.success) {
          dispatch(setSignedIn());
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.log(alert(error));
      }
    } else {
      try {
        const res = await axios.post("/org/login", {
          email: email,
          password: password,
        });
        if (res.data.success) {
          dispatch(setSignedIn());
          navigate("/ddashboard", { replace: true });
        }
      } catch (error) {
        console.log(alert(error));
      }
    }
  };

  useEffect(() => {
    if (email.length) {
      const regex = new RegExp(
        "^([a-z0-9-._]+)@([a-z0-9-]+).([a-z]{2,20})(.[a-z]{2,8})?$",
        "i"
      );
      if (!regex.test(email)) {
        setValidEmailVisiblity("");
      } else setValidEmailVisiblity("invisible");
    } else setValidEmailVisiblity("invisible");
  }, [email]);

  return (
    <div id={styles.loginBody}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={styles.greenLayer1}>
        <div id={styles.loginFormDiv}>
          <div>
            <h1>Welcome back!</h1>
          </div>
          <form className="col-6" id="loginForm">
            {/* Input field for email */}
            <div className="form-floating mt-3 col-12 mx-2">
              <select
                id="userType"
                name="userType"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="form-control"
                required
              >
                <option value="">Select User Type</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Organization">Organization</option>
              </select>
              <label htmlFor="userType">User Type</label>
            </div>
            <div className="form-floating mt-2 col-12 mx-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control outline-none"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={`${validEmailVisiblity} flex justify-center mt-2`}>
              <h1 className="text-red-600">{emailMessage}</h1>
            </div>
            {/* Input field for password */}
            <div className="form-floating mt-1 col-12 mx-2">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            {/* Buttons for login and sign-up */}
            <div className="d-flex flex-column flex-md-row  mx-2 mt-5 justify-content-between">
              <button
                className="col-12 col-md-6"
                id={styles.loginBtn}
                type="submit"
                onClick={(event) => submitTo(event)}
              >
                Login
              </button>
              <button
                className={[
                  "col-12 col-md-6 mt-3 mt-md-0",
                  styles.signUpBtn,
                ].join(" ")}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </div>
            <div className="mt-3 mx-2">
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot Password?
              </Link>
            </div>
          </form>
          {type === "Patient" && (
            <div className="mt-3 mx-2">
              <GoogleButton
                onClick={() => {
                  googleLogin();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
