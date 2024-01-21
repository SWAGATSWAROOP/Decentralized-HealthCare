import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div id={styles.loginBody}>
      <div className={styles.greenLayer1}>
        <div id={styles.loginFormDiv}>
          <h1>Welcome back!</h1>
          <form className="col-6" id="loginForm">
            {/* Input field for email */}
            <div className="form-floating mt-3 col-12 mx-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>

            {/* Input field for password */}
            <div className="form-floating mt-4 col-12 mx-2">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
                placeholder="password"
              />
              <label htmlFor="password">Password</label>
            </div>

            {/* Buttons for login and sign-up */}
            <div className="d-flex flex-column flex-md-row  mx-2 mt-5 justify-content-between">
              <button
                className="col-12 col-md-6"
                id={styles.loginBtn}
                type="submit"
              >
                Login
              </button>
              <button
                className={[
                  "col-12 col-md-6 mt-3 mt-md-0",
                  styles.signUpBtn,
                ].join(" ")}
              >
                Sign Up
              </button>
            </div>
            <div className="mt-3 mx-2">
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot Password?
              </Link>
            </div>
            <div className="mt-3 mx-2">
              <GoogleLogin
                clientId="your-google-client-id"
                buttonText="Google"
                className={styles.googleSignInButton}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
