import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GenericModal from "../shared/GenericModal";
import { Login } from "./user/login-registration";
const LoginRegisterPopUp = ({ asklogin }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const isMobile = useSelector((state) => state.store.isMobile);
  const handleSignInClick = (param) => {
    if (param) {
      asklogin(); //this line is not working 
      setShowLoginPopup(false);
    } else {
      setShowLoginPopup(true);
      // setShowRegisterPopup(true);
    }
  };

  // const handleSignUpClick = (param) => {
  //   if (param) {
  //     setShowRegisterPopup(true);
  //   } else {
  //     setShowRegisterPopup(false);
  //     setShowLoginPopup(true);
  //   }
  // };

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
    </>
  );
};
export default LoginRegisterPopUp;