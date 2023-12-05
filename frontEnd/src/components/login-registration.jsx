import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUserAlt,
  faLock,
  faCheckCircle,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
export function Login() {
  return <div></div>;
}

function placeholder() {
  return (
    <>
      <div>hello h </div>
    </>
  );
}
export function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "", // Make sure to include confirmPassword in formData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Save registration data
    const registrationData = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };

    // You can save the registrationData or perform further actions here
    console.log("Registration data:", registrationData);

    // Clear form fields
    setFormData({
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="registration-container">
      <div className="welcome-banner">
        <FontAwesomeIcon icon={faRocket} className="icon" />
        <h3>Welcome </h3>
        <p>start reading, reader is leader this tooks you 3-5 sec atmost</p>
        <button className="btn btn-primary-white" type="submit">
          Login
        </button>
      </div>
      <div className="form-bg">
        <div className="form-container"></div>
        <div className="form-content">
          <h3>Welcome to Gr8Books</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                  />
                </div>
                <br />
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    required
                  />
                </div>
                <br />
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUserAlt} className="icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username *"
                    required
                  />
                </div>
                <br />
              </div>
              <div>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password *"
                    required
                  />
                </div>
                <br />
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password *"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h3>google.com</h3>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
