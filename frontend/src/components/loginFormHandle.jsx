import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GenericModal from "../shared/GenericModal";
import { Login, Register } from "./user/login-registration";
const LoginRegisterPopUp = ({ asklogin, login }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(login);
  const [showRegisterPopup, setShowRegisterPopup] = useState(!login);
  const isMobile = useSelector((state) => state.store.isMobile);
  const handleSignInClick = () => {
    if (login) {
      setShowLoginPopup(false);
    } else {
      setShowLoginPopup(true);
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
    <>
      {showLoginPopup && (
        <>
          <GenericModal
            customStyles={!isMobile ? "" : "left"}
            isOpen={showLoginPopup}
            onClose={() => {
              asklogin();
              setShowLoginPopup(false);
            }}
          >
            <Login
              success={() => {
                setShowLoginPopup(false);
              }}
              HandleRegister={() => handleSignInClick(false)}
            />
          </GenericModal>
        </>
      )}
      {showRegisterPopup && (
        <>
          <GenericModal
            customStyles={!isMobile ? "" : "left"}
            isOpen={showRegisterPopup}
            onClose={() => setShowRegisterPopup(false)}
          >
            <Register
              success={() => {
                setShowRegisterPopup(false);
              }}
              HandleLogin={() => handleSignUpClick(false)}
            />
          </GenericModal>
        </>
      )}
    </>
  );
};
export default LoginRegisterPopUp;
