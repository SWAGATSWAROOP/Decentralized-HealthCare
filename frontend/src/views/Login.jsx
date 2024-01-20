import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useHistory } from 'react-router-dom';
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
// import axios from "axios";

function Login() {
  // React Router hook to navigate between pages
  // const navigate = useNavigate();

  // State variables to manage form inputs and error handling
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  // Context hook to access user-related functions from the context
  const { signInUser } = useContext(UserContext);

  // Function to open error dialogue box
  const handleDialogueOpen = () => {
    setErrorDialogueBoxOpen(true);
  };

  // Function to close error dialogue box and clear errors
  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      let user = response.data.user;
      const token = response.data.token;

      if (response.status === 200) {
        // If login is successful, update user context and navigate to the home page
        signInUser(user, token);
        navigate("/");
        toast.success("User Login Successfully");
      }
    } catch (error) {
      // If login fails, display an error message
      console.error("Error during login:", error);
      toast.error("Login failed");
    }
  };
  const history = useHistory();
  // Function to handle sign-up button click
  const signUpClicked = () => {
   history.push("/Register");
  };
  const responseGoogle = (response) => {
    // Handle Google authentication response
    console.log(response);
    
  };
  return (
    <div id={styles.loginBody}>
      <div className={styles.greenLayer1}>
        <div id={styles.loginFormDiv}>
          <p>Welcome back! Please login to your account</p>
          <form onSubmit={handleSubmit} className="col-6" id="loginForm">
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
                onClick={signUpClicked}
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
                buttonText="Sign In with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
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
