import { GoStarFill } from "react-icons/go";
import { PiGlobe } from "react-icons/pi";
import { RightSideBar } from "./side-bar";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const DropdownButton = ({ buttonTitle, dropDownContent }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  const handleClose = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={buttonRef}>
      <button
        id="dropdownDefaultButton"
        className="font-medium text-md py-2.5 text-center inline-flex items-center"
        type="button"
        onMouseOver={handleToggleDropdown}
        onClick={handleToggleDropdown}
      >
        {buttonTitle}
        <svg
          className="w-2.5 h-2.5 ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {dropdownVisible && (
        <div
          id="dropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md min-w-max dark:bg-gray-100"
        >
          <ul className="py-2 text-sm cursor-pointer select-none">
            {dropDownContent?.map((element) => (
              <li
                key={element.title}
                onClick={() => {
                  handleClose();
                  navigate(element.link);
                }}
                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-200 dark:hover:text-gray-700"
              >
                {element.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

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
                className="w-10 h-10 rounded-full overflow-hidden"
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
