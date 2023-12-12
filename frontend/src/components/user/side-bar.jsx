/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FcDownload, FcReading } from "react-icons/fc";
import { SiBookstack } from "react-icons/si";
import { FaUserGear } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose, MdLogout } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { TiDocumentAdd } from "react-icons/ti";
import "../../assets/style/userHome.css";

export function AccountSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };
  return (
    <div>
      <div className="account-sidebar">
        <h3 className="item sidebar-header">My Account</h3>
        <div
          className={`item profile ${isActive("/account/profile") ? "active" : ""
            }`}
          onClick={() => {
            navigate("/account/profile");
          }}
        >
          <FaUser />
          Profile
        </div>
        <div
          className={`item reading-history ${isActive("read-history") ? "active" : ""
            }`}
          onClick={() => {
            navigate("/read-history");
          }}
        >
          <FcReading />
          Reading History
        </div>
        <div
          className={`item books ${isActive("my-contributions") ? "active" : ""
            }`}
          onClick={() => {
            navigate("/my-contributions");
          }}
        >
          <SiBookstack />
          My Contributions
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className={`right-sideBar`}
            >
              <span
                onClick={() => {
                  setShow(false);
                  setTimeout(closeBar, 1000);
                }}
              >
                <MdClose className="icon-exit" />
              </span>
              <ProfileHeader
                close={() => {
                  setShow(false);
                  setTimeout(closeBar, 1000);
                }}
              />
              <RightSideContent
                close={() => {
                  setShow(false);
                  setTimeout(closeBar, 1000);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ProfileHeader({ close }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="profile-header">
        <img
          onClick={() => {
            navigate("/account/profile");
            close();
          }}
          src="/images/placeholder.jpg"
        />
        <div>
          <div>Hi, John Doe</div>
          <div className="text-muted">johnDoe123</div>
        </div>
      </div>
    </>
  );
}

export function RightSideContent({ close }) {
  const navigate = useNavigate();
  return (
    <>
      <ul>
        <li
          onClick={() => {
            navigate("/account/profile");
            close();
          }}
        >
          <FaUserGear className="icon" /> Account detail
        </li>
        <li>
          <GoStarFill className="icon" />
          Favorites
        </li>
        <li>
          <SiBookstack className="icon" />
          My Contributions
        </li>
        <li>
          <FcDownload className="icon" />
          Downloads
        </li>
        <li>
          <MdLogout className="icon" />
          Log out
        </li>
      </ul>
    </>
  );
}

export function UserSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="left-user-side-bar mt-14 text-center">
      <ul className="flex flex-col">
        <li
          className={`side-bar-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/ ")}
        >
          <BarItem name={'Home'} icon={<FaHome className="icon text-2xl" />}/>
        </li>
        <li
          className={`side-bar-item ${isActive("/Upload-book") ? "active" : ""}`}
          onClick={() => navigate("/Upload-book")}
        >
          
          <BarItem name={'Create'} icon={<TiDocumentAdd className="icon text-2xl" />}/>
        </li>
        <li
          className={`side-bar-item ${isActive("/Account") ? "active" : ""}`}
          onClick={() => navigate("/Account/profile")}
        >
       
          <BarItem name={'Account'} icon={<FaUserGear className="icon text-2xl" />}/>
        </li>
        <li
          className={`side-bar-item ${isActive("/My-books") ? "active" : ""}`}
          onClick={() => navigate("/My-books")}
        > 
          <BarItem name={'My Books'} icon={<SiBookstack className="icon text-2xl" />}/>
        </li>
        <li
          className={`side-bar-item ${isActive("/My-favorites") ? "active" : ""}`}
          onClick={() => navigate("/My-favorites")}
        >
          <BarItem name={'My Favors'} icon={<GoStarFill className="icon text-2xl" />} />
        </li>
      </ul>
    </div>
  );
}

function BarItem({ name, icon }) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      {icon}
      <div className="text-sm">{name}</div>
    </div>)
}