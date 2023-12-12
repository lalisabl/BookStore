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
      <div>
  <div className="nav account-nav bg-light-white fixed top-0 left-0 w-full h-0 flex">
    <div className="nav-right flex items-center gap-0">
      <img className="logo w-16" src="/images/pre-logo.png" alt="logoPhoto" />
      <div className="upload cursor-pointer">upload</div>
    </div>
    <div className="nav-left flex items-center gap-2">
      <div className="favorites flex items-center cursor-pointer">
        <GoStarFill className="mr-1" />
        Fav
      </div>
      <div className="langueges flex items-center">
        <PiGlobe className="mr-1" />
        <select
          value={language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
          className="border-none focus:outline-none"
        >
          <option value="en">en</option>
          <option value="es">oro</option>
          <option value="fr">amh</option>
        </select>
      </div>
      <button onClick={handleClick} className="btn profile">
        <img
          src="/images/male.png"
          className="userProfilePhoto w-10 h-10 rounded-full overflow-hidden"
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

    </div>
  );
}
