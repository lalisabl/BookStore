import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import { SiBookstack } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";

export function AccountSideBar() {
  const [activeButton, setActiveButton] = useState("Profile");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="account-sidebar">
        <h3 className="item sidebar-header">My Account</h3>
        <div
          className={`item profile ${
            activeButton === "Profile" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Profile")}
        >
          <FaUser />
          Profile
        </div>
        <div
          className={`item reading-history ${
            activeButton === "History" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("History")}
        >
          <FcReading />
          Reading History
        </div>
        <div
          className={`item books ${
            activeButton === "My Books" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("My Books")}
        >
          <SiBookstack />
          My Books
        </div>
      </div>
    </div>
  );
}

export function RightSideBar({ closeBar, show }) {
  const [isShow, setShow] = useState(show);
  return (
    <>
      <AnimatePresence>
        {isShow && (
          <div
            className="modal"
            onClick={() => {
              setShow(false);
              setTimeout(closeBar, 1000);
            }}
          >
            <motion.div
              className="right-sideBar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`right-sideBar ${isShow ? "visible" : ""}`}
              >
                right side bar{" "}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
