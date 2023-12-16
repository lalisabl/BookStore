import { GoStarFill } from "react-icons/go";
import { PiGlobe } from "react-icons/pi";
import { RightSideBar } from "./side-bar";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DropdownButton from "../../shared/dropdown";



export default function UserNav() {
  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const [isRightSideBarVisible, setRightSideBarVisibility] = useState(false);

  const handleClick = () => {
    setRightSideBarVisibility(true);
  };
  const navigate = useNavigate();

  const dropdown = [
    {
      title: "dashboard",
      link: "/dashboard",
    },
    {
      title: "other but",
      link: "/b",
    },
    {
      title: "My favorites",
      link: "/My-favorites",
    },
  ];
  return (
    <div>
      <div>
        <div className="nav account-nav fixed top-0 left-0 w-full h-0 flex">
          <div className="nav-right flex items-center gap-0">
            <img
              className="logo w-16"
              src="/images/pre-logo.png"
              alt="logoPhoto"
            />
            <DropdownButton buttonTitle={"Books"} dropDownContent={dropdown} />
          </div>
          <div className="nav-left flex items-center">
            <div
              className=" flex items-center cursor-pointer"
              onClick={() => navigate("/ ")}
            >
              <FaHome className="icon text-lg" />
              Home
            </div>
            <div
              onClick={() => navigate("/My-favorites")}
              className="favorites flex items-center cursor-pointer"
            >
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
