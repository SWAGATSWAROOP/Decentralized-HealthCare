import React from 'react';

const RegisterPage = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleLoginLink = (e) => {
    e.preventDefault();
    // Handle login link logic here
  };

  return (
    <div className="container forms">
      <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form onSubmit={handleSignup}>
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Create password"
                className="password"
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirm password"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field button-field">
              <button type="submit">Signup</button>
            </div>
          </form>

          <div className="form-link">
            <span>
              Already have an account?{' '}
              <a href="#" className="link login-link" onClick={handleLoginLink}>
                Login
              </a>
            </span>
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field google">
            <img src="#" alt="" className="google-img" />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
