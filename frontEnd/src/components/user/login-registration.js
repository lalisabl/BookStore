import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUserAlt,
  faLock,
  faCheckCircle,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { apiurl } from "../../assets/constData";
export function Login() {
  return (
    <div className="registration-container">
      <div className="welcome-banner">
        <FontAwesomeIcon icon={faRocket} className="icon" />
        <h3>Welcome </h3>
        <p>start reading, reader is leader this tooks you 3-5 sec atmost</p>
        <button className="btn btn-primary-white" type="submit">
          Register
        </button>
      </div>
      <div className="form-bg">
        <div className="form-container"></div>
        <div className="form-content">
          <h3>Welcome to Gr8Books</h3>
          <form>
            <div>
              <div>
                {" "}
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUserAlt} className="icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username *"
                    required
                  />
                </div>
                <br />
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
            <div className="with-google">
              <img src="images/google.png" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [usernameAvailability, setUsernameAvailability] = useState(null);
  const [emailAvailability, setEmailAvailability] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  useEffect(() => {
    const checkAvailability = async () => {
      if (formData.username && focusedInput === "username") {
        const response = await axios.get(
          `${apiurl}/users/check-availabilty?username=${formData.username}`
        );
        setUsernameAvailability(response.data.available);
      }

      if (formData.email && focusedInput === "email") {
        const response = await axios.get(
          `${apiurl}/users/check-availabilty?email=${formData.email}`
        );
        setEmailAvailability(response.data.available);
      }
    };

    // Perform the check whenever username or email in formData changes
    checkAvailability();
  }, [formData.username, formData.email, focusedInput]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (emailAvailability && usernameAvailability) {
        const response = await axios.post(`${apiurl}/users/register`, formData);
        console.log("Registration successful:", response.data);
      } else {
        console.log("either email or username is taken");
        if (!emailAvailability) {
          setFocusedInput("email");
        }
        if (!usernameAvailability) {
          setFocusedInput("username");
        }
      }
      // Add any additional logic for successful registration (e.g., redirect)
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // Handle registration failure (e.g., display an error message to the user)
    }
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
                    onFocus={() => handleInputFocus("fullName")}
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
                    onFocus={() => handleInputFocus("email")}
                    placeholder="Email *"
                    required
                    onInput={handleChange} // Triggered as the user types
                  />
                  {emailAvailability !== null &&
                    formData.email !== "" &&
                    focusedInput === "email" && (
                      <div
                        className={emailAvailability ? "available" : "taken"}
                      >
                        {emailAvailability ? "email available" : "email taken"}
                      </div>
                    )}
                </div>
                <br />
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUserAlt} className="icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => handleInputFocus("username")}
                    placeholder="Username *"
                    required
                    onInput={handleChange} // Triggered as the user types
                  />
                  {usernameAvailability !== null &&
                    formData.username !== "" &&
                    focusedInput === "username" && (
                      <div
                        className={usernameAvailability ? "available" : "taken"}
                      >
                        {usernameAvailability
                          ? "username available"
                          : "username taken"}
                      </div>
                    )}
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
                    onFocus={() => handleInputFocus("password")}
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
                    onFocus={() => handleInputFocus("confirmPassword")}
                    placeholder="Confirm Password *"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
            <div className="with-google">
              <img src="images/google.png" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
