import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import axios from "axios";

function Register() {
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [organizationType, setOrganizationType] = useState("");

  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let user = {
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      userType,
      address,
      profilePhoto,
      organizationType,
    };

    // Attach Frontend With Backend Fetching Data using axios
    const response = await axios.post(
      "http://localhost:8080/api/register",
      user
    );

    if (response.status === 200) {
      console.log("User Added");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setUsername("");
      setPassword("");
      setAddress("");
      setProfilePhoto(null);
      setOrganizationType("");
      history.push("/");
    }
  };

  useEffect(() => {
    if (password.length > 0 && password?.trim()?.length <= 6) {
      setPasswordValidationMessage(
        "Password Length must be greater than 6 characters"
      );
    } else {
      setPasswordValidationMessage("");
    }
  }, [password]);

  return (
    <div id={styles.signUpBody}>
      <div id={styles.signUpBG}>
        <div className={styles.greenLayer}></div>
      </div>
      <div>
        <h2>Create An Account</h2>
        <form className={styles.signUpform} onSubmit={handleSubmit}>
          <div className="form-floating mt-3 col-12 mx-2">
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(event) => setUserType(event.target.value)}
              className="form-select"
              required
            >
              <option value="">Select User Type</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Organization">Organization</option>
            </select>
            <label htmlFor="userType">User Type</label>
          </div>

          {(userType === "Patient" || userType === "Doctor") && (
            <div>
              <div className="d-flex flex-column flex-lg-row flex-sm-column mt-5">
                <div className="col-12 col-sm-12 col-lg-6  form-floating mx-2 ">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="first name"
                    value={firstName}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="col-12  col-sm-12 col-lg-6  mt-3 mt-sm-3 mt-lg-0 form-floating mx-2">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="last name"
                    value={lastName}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
              <div className="form-floating mt-3 col-12 mx-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
          )}

          {userType === "Patient" && (
            <div className="form-floating mt-3 col-12 mx-2">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="1234567890"
                pattern="[0-9]{10}"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                className="form-control"
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
          )}

          {(userType === "Doctor" || userType === "Organization") && (
            <div>
              <div className="form-floating mt-3 col-12 mx-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="form-control"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mt-3 col-12 mx-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-control"
                  required
                  placeholder="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="mx-2 text-danger">
                {passwordValidationMessage}
              </div>
            </div>
          )}

          {userType === "Organization" && (
            <div className="form-floating mt-3 col-12 mx-2">
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                className="form-control"
                placeholder="organization name"
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
              <label htmlFor="organizationName">Organization Name</label>
            </div>
          )}

          {(userType === "Doctor" || userType === "Organization") && (
            <div>
              <div className="form-floating mt-3 col-12 mx-2">
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="form-control"
                ></textarea>
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mt-3 col-12 mx-2">
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  onChange={(event) => setProfilePhoto(event.target.files[0])}
                  className="form-control"
                />
                <label htmlFor="profilePhoto">Profile Photo</label>
              </div>
            </div>
          )}

          <div className="form-group form-check mt-5 mx-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms-chkbox"
              required
            />
            <label className="" htmlFor="terms-chkbox">
              I agree with the terms and conditions
            </label>
          </div>
          <div className="text-center">
            <button id={styles.signUpBtn} type="submit">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            Already have an account?{" "}
            <NavLink to="/login" exact>
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
