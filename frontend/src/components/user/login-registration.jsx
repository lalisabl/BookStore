import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../redux/actions";

export function Login({ HandleRegister, success }) {
  const [identifier, setIdentifier] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${apiurl}/users/login`,
        {
          // [identifier.includes("@") ? "email" : "username"]: identifier,
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setLoginStatus(true));
        success();
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err.response);
          setError(err.response.data.message);
        }
        dispatch(setLoginStatus(false));
      });
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
    <div className="registration-container  register">
      <div className="welcome-banner">
        <FontAwesomeIcon icon={faRocket} className="icon" />
        <h3>Welcome </h3>
        <p>start reading, reader is leader this takes you 3-5 sec atmost</p>
        <button
          className="btn btn-primary-white"
          type="button"
          onClick={() => HandleRegister()}
        >
          Register
        </button>
      </div>
      <div className=" form-bg">
        <div className="form-container"></div>
        <div className="form-content">
          <h3>Welcome to HayuBk</h3>

          <form onSubmit={handleLoginSubmit}>
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
            <div>
              <div>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUserAlt} className="icon" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email or Username"
                    required
                  />
                </div>
                <br />
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password *"
                    required
                  />
                </div>
              </div>
            </div>
            {error && (
              <div className="p-1 pr-14 pl-14 w-max m-auto bg-red-200 bg-opacity-60 text-red-800 text-center  rounded">
                {error}
              </div>
            )}
            <div>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Register({ HandleLogin, success }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
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
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
      if (!emailAvailability) {
        setFocusedInput("email");
        setError("");
      }
      if (emailAvailability) {
        const response = await axios.post(
          `${apiurl}/users/register`,
          formData,
          { withCredentials: true }
        );
        dispatch(setLoginStatus(true));
        success();
        setError("");
        console.log("Registration successful:", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      dispatch(setLoginStatus(false));
    }
  };

  const handleWithGoogle = async () => {
    try {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fusers%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=${CLIENT_ID}`;
    } catch (err) {
      console.log("Registration field");
    }
  };

  return (
    <div className="registration-container register">
      <div className="welcome-banner">
        <FontAwesomeIcon icon={faRocket} className="icon" />
        <h3>Welcome </h3>
        <p>start reading, reader is leader this takes you 3-5 sec at most</p>
        <button
          className="btn btn-primary-white"
          type="button"
          onClick={HandleLogin}
        >
          Login
        </button>
      </div>

      <div className="form-bg">
        <div className="form-container"></div>
        <div className="form-content">
          <h3>Welcome to HayuBk</h3>
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
                onInput={handleChange}
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
              {error ? (
                <p className=" text-sm text-center text-red-500">{error}</p>
              ) : (
                ""
              )}
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
