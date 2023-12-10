import { useState } from "react";
import ProfileDetail from "./profileDetail";
import { PiGlobe } from "react-icons/pi";
import { GoStarFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import { SiBookstack } from "react-icons/si";
import ReadingHistory from "./readingHistory";
import Favorites from "./favorites";
import Books from "./myBooks";
import "./account.css";
const Account = () => {
  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };
  return (
    <div>
      <div className="nav account-container">
        <div className="account-nav">
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
            <button className="btn profile">
              <img
                src="./images/male.png"
                className="userProfilePhoto"
                alt="userPhoto"
              />
            </button>
          </div>
        </div>
        <div className="account-sidebar">
          <h3 className="item sidebar-header">My Account</h3>
          <div className="item profile">
            <FaUser />
            Profile
          </div>
          <div className="item reading-history">
            <FcReading />
            ReadingHistory
          </div>
          <div className="item books">
            <SiBookstack />
            My Books
          </div>
        </div>
        <div className="account-main">{<ProfileDetail />}</div>
      </div>
    </div>
  );
};
export default Account;
