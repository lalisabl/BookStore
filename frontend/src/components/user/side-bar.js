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
          className={`item profile ${
            isActive("/account/profile") ? "active" : ""
          }`}
          onClick={() => {
            navigate("/account/profile");
          }}
        >
          <FaUser />
          Profile
        </div>
        <div
          className={`item reading-history ${
            isActive("read-history") ? "active" : ""
          }`}
          onClick={() => {
            navigate("/read-history");
          }}
        >
          <FcReading />
          Reading History
        </div>
        <div
          className={`item books ${
            isActive("my-contributions") ? "active" : ""
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
    <div className="left-user-side-bar">
      <ul>
        <li
          className={`bar-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/ ")}
        >
          <FaHome className="icon" />
          <div>Home</div>
        </li>
        <li
          className={`bar-item ${isActive("/Upload-book") ? "active" : ""}`}
          onClick={() => navigate("/Upload-book")}
        >
          <TiDocumentAdd className="icon" />
          <div>Create</div>
        </li>
        <li
          onClick={() => navigate("/Account/profile")}
          className={`bar-item ${isActive("/Account") ? "active" : ""}`}
        >
          <FaUserGear className="icon" />
          <div>Account</div>
        </li>
        <li
          onClick={() => navigate("/My-books")}
          className={`bar-item ${isActive("/My-books") ? "active" : ""}`}
        >
          <SiBookstack className="icon" />
          <div>my Books</div>
        </li>
        <li
          onClick={() => navigate("/My-favorites")}
          className={`bar-item ${isActive("/My-favorites") ? "active" : ""}`}
        >
          <GoStarFill className="icon" />
          <div>My Favors</div>
        </li>
      </ul>
    </div>
  );
}
