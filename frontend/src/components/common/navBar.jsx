import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import GenericModal from "../../shared/GenericModal";
import { Login, Register } from "../user/login-registration";
export default function NavBar({ where }) {
  return <div>{where === "landing" ? <NavBarLanding /> : <></>}</div>;
}

export function NavBarLanding({ setLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQ, setSearchQ] = useState("");
  const setSearch = (e) => {
    setSearchQ(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchParams.set("q", searchQ);
    const updatedSearchParams = searchParams.toString();
    const newURL = `${location.pathname}?${updatedSearchParams}`;
    navigate("/search?" + updatedSearchParams);
  };
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const handleSignInClick = (param) => {
    if (param) {
      setShowLoginPopup(true);
    } else {
      setShowLoginPopup(false);
      setShowRegisterPopup(true);
    }
  };

  const handleSignUpClick = (param) => {
    if (param) {
      setShowRegisterPopup(true);
    } else {
      setShowRegisterPopup(false);
      setShowLoginPopup(true);
    }
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src="images/pre-logo.png" />
      </div>
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            onChange={setSearch}
            type="text"
            placeholder="Search Books ..."
          />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
      <div className="sign-btn">
        <div className="signIn-btn" onClick={() => handleSignInClick(true)}>
          <span>
            <FontAwesomeIcon icon={faUser} className="icon" />
            Sign in
          </span>
        </div>
        <div className="signUp-btn" onClick={() => handleSignUpClick(true)}>
          <button className="btn btn-primary-white">Join for free</button>
        </div>
        {showLoginPopup && (
          <>
            <GenericModal
              isOpen={showLoginPopup}
              onClose={() => setShowLoginPopup(false)}
            >
              <Login
                HandleRegister={() => handleSignInClick(false)}
                SetLogin={setLogin}
              />
            </GenericModal>
          </>
        )}
        {showRegisterPopup && (
          <>
            <GenericModal
              isOpen={showRegisterPopup}
              onClose={() => setShowRegisterPopup(false)}
              children={
                <Register HandleLogin={() => handleSignUpClick(false)} />
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
