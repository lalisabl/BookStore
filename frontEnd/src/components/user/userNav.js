import React, { useState } from "react";
import { GoStarFill } from "react-icons/go";
import { PiGlobe } from "react-icons/pi";
import { RightSideBar } from "./side-bar";

export default function UserNav() {
  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const [isRightSideBarVisible, setRightSideBarVisibility] = useState(false);

  const handleClick = () => {
    setRightSideBarVisibility(true);
  };
  return (
    <div>
      <div className="nav account-nav">
        <div className="nav-right">
          <img className="logo" src="./images/pre-logo.png" alt="logoPhoto" />
          <div className="upload">upload</div>
        </div>
        <div className="nav-left">
          <div className="favorites">
            <GoStarFill />
            Fav
          </div>
          <div className="langueges">
            <PiGlobe />{" "}
            <select
              value={language}
              onChange={(e) => handleChangeLanguage(e.target.value)}
            >
              <option value="en">en</option>
              <option value="es">oro</option>
              <option value="fr">amh</option>
            </select>
          </div>
          <button onClick={handleClick} className="btn profile">
            <img
              src="./images/male.png"
              className="userProfilePhoto"
              alt="userPhoto"
            />
          </button>

          {isRightSideBarVisible && (
            <RightSideBar
              closeBar={() => {
                setRightSideBarVisibility(false);
              }}
              show={isRightSideBarVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
}
