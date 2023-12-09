import { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import {
  faEnvelope,
  faUserAlt,
  faLock,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { apiurl } from "../../assets/constData";
import { CLIENT_ID } from "../../hidden";

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
    email: "",
    username: "",
    password: "",
  });
  const [emailAvailability, setEmailAvailability] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  // const navigate = useNavigate();

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
      if (emailAvailability) {
        const response = await axios.post(`${apiurl}/users/register`, formData);
        console.log("Registration successful:", response.data);
      } else {
        setFocusedInput("email");
      }
      // Add any additional logic for successful registration (e.g., redirect)
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // Handle registration failure (e.g., display an error message to the user)
    }
  };
  const handleWithGoogle = async () => {
    try {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fusers%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=${CLIENT_ID}`;
      // await axios.get(`${apiurl}/users/auth/google`, { withCredentials: true });
    } catch (err) {
      console.log("Registration field");
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
            <div className="with-google">
              <button
                className="with-google_btn"
                onClick={handleWithGoogle}
                type="button"
              >
                <FcGoogle />
                <span>Continue with google</span>
              </button>
            </div>
            <div className="option-or">Or</div>
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
                  <div className={emailAvailability ? "available" : "taken"}>
                    {emailAvailability ? "email available" : "email taken"}
                  </div>
                )}
            </div>
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
