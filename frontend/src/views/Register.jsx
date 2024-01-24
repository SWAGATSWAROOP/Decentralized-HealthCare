import React, { useState } from "react";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [emailMessage, setEmailMessage] = useState("Invalid");
  const [passwordMessage, setPasswordMessage] = useState("Invalid");
  const [validEmailVisiblity, setValidEmailVisiblity] = useState("invisible");
  const [validPasswordVisiblity, setValidPasswordVisiblity] =
    useState("invisible");

  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profilephoto", profilePhoto);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (userType === "Patient") {
      const name = firstName + " " + lastName;
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneno", phone);
      formData.append("password", password);
      await axios
        .post("/user/register", formData, config)
        .then(() => navigate("/login"))
        .catch();
    } else if (userType === "Doctor") {
      const name = firstName + lastName;
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneno", phone);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("type", userType);
      await axios
        .post("/org/register", formData, config)
        .then(() => navigate("/login"))
        .catch();
    } else if (userType === "Organization") {
      formData.append("name", firstName);
      formData.append("email", email);
      formData.append("phoneno", phone);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("type", userType);
      await axios
        .post("/org/register", formData, config)
        .then(() => navigate("/login"))
        .catch();
    }
  };

  return (
    <div id={styles.signUpBody}>
      <div id={styles.signUpBG}>
        <div className={styles.greenLayer}></div>
      </div>
      <div>
        <h2>Create An Account</h2>
        <form className={styles.signUpform} onSubmit={handleSubmit}>
          <div className="form-floating mt-2 col-12 mx-2">
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
              <div className="d-flex flex-column flex-lg-row flex-sm-column mt-3">
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
                <div className="col-12  col-sm-12 col-lg-6  mt-2 mt-sm-3 mt-lg-0 form-floating mx-2">
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
            </div>
          )}

          {userType !== "" && (
            <div>
              <div className="form-floating mt-2 col-12 mx-2">
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
              <div className="form-floating mt-2 col-12 mx-2">
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
              <div className="form-floating mt-2 col-12 mx-2">
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
            </div>
          )}

          {userType === "Organization" && (
            <div className="form-floating mt-2 col-12 mx-2">
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
            <div className="mt-2 col-12 mx-2">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="form-control overflow-scroll resize-none"
              ></textarea>
            </div>
          )}
          {(userType === "Doctor" ||
            userType === "Organization" ||
            userType === "Patient") && (
            <div className="mt-2 col-12 mx-2">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                accept="image"
                multiple={false}
                id="profilePhoto"
                name="profilePhoto"
                onChange={(event) => setProfilePhoto(event.target.files[0])}
                className="form-control"
              />
            </div>
          )}
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
