import { useEffect, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FcDownload, FcReading } from "react-icons/fc";
import { SiBookstack } from "react-icons/si";
import { FaUserGear } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";
import { RiArrowUpSFill } from "react-icons/ri";
import GenericModal from "../../shared/GenericModal";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose, MdLogout } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { TiDocumentAdd } from "react-icons/ti";
import "../../assets/style/userHome.css";
import axios from "axios";
import { apiurl, host } from "../../assets/constData";
import { useSelector } from "react-redux";
import Modal from "react-modal";
Modal.setAppElement("#root");

export function AccountSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const isActive = (path) => {
    return location.pathname.includes(path);
  };
  const handleClick = (naviTo) => {
    navigate(`/${naviTo}`);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div
      className={`flex-col gap-2 sm:bg-gray-200  sm:p-5 sm:mt-16 
      ${!showSidebar ? "sm:fixed sm:w-2/12 sm:flex top-0 bottom-0" : " "}
       `}
    >
      <div
        className="top-toggle shadow-lg flex ml-8 mr-8 justify-between sm:hidden cursor-pointer"
        onClick={toggleSidebar}
      >
        <h4>profile</h4>
        {showSidebar ? <RiArrowUpSFill /> : <FaSortDown />}
      </div>

      {/* Sidebar Header */}
      <h3 className="sm:block sm: hidden sidebar-header">My Account</h3>

      {/* Sidebar Items */}
      <div className={`${showSidebar ? "block" : "hidden"} sm:block`}>
        <div className={`${isActive("account/profile") ? "active" : ""}`}>
          <SidebarComp HandleClick={() => handleClick("account/profile")}>
            <>
              <FaUser />
              Profile
            </>
          </SidebarComp>
        </div>

        <div className={`${isActive("reading-history") ? "active" : ""}`}>
          <SidebarComp HandleClick={() => handleClick("reading-history")}>
            <>
              <FcReading />
              Reads
            </>
          </SidebarComp>
        </div>

        <div className={`${isActive("my-contributions") ? "active" : ""}`}>
          <SidebarComp HandleClick={() => handleClick("my-contributions")}>
            <>
              <SiBookstack />
              MyUploads
            </>
          </SidebarComp>
        </div>
      </div>
    </div>
  );
}

export function RightSideBar({ closeBar, show }) {
  const userInfo = useSelector((state) => state.store.userInfo);
  const [isShow, setShow] = useState(show);
  return (
    <>
      <AnimatePresence>
        {isShow && (
          <div
            className="modal z-30"
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
              className={`right-sideBar z-50 `}
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
                userInfo={userInfo}
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

export function ProfileHeader({ close, userInfo }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center h-20">
        <img
          onClick={() => {
            navigate("/account/profile");
            close();
          }}
          className="mr-2 rounded-full p-0 h-20 w-auto"
          src={`${host}/images/users/${userInfo.profile.picture}`}
        />
        <div>
          <h4>Hi,{userInfo.profile?.fullName}</h4>
          <p className="text-muted">{userInfo.username}</p>
        </div>
      </div>
    </>
  );
}

export function RightSideContent({ close }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleLogoutConfirmed = async () => {
    try {
      await axios.get(`${apiurl}/users/logout`, { withCredentials: true });
      setModalIsOpen(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <ul>
        <li
          onClick={() => {
            navigate("/account/profile");
            close();
          }}
        >
          <FaUserGear className="text-xl mr-3" /> Account detail
        </li>
        <li
          onClick={() => {
            navigate("/My-favorites");
            close();
          }}
        >
          <GoStarFill className="text-xl mr-3" />
          Favorites
        </li>
        <li>
          <SiBookstack className="text-xl mr-3" />
          My Contributions
        </li>
        <li>
          <FcDownload className="text-xl mr-3" />
          Downloads
        </li>
        <li onClick={openModal}>Logout</li>
      </ul>
      <Popup
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        message="Are you sure you want to log out?"
        onConfirm={handleLogoutConfirmed}
      />
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
    <div className="fixed left-user-side-bar mt-14 text-center z-10">
      <ul className="flex flex-col">
        <li
          className={`side-bar-item ${
            location.pathname === "/" ? "active" : ""
          }`}
          onClick={() => navigate("/ ")}
        >
          <BarItem name={"Home"} icon={<FaHome className="icon text-2xl" />} />
        </li>
        <li
          className={`side-bar-item ${
            isActive("/Upload-book") ? "active" : ""
          }`}
          onClick={() => navigate("/Upload-book")}
        >
          <BarItem
            name={"Create"}
            icon={<TiDocumentAdd className="icon text-2xl" />}
          />
        </li>
        <li
          className={`side-bar-item ${isActive("/Account") ? "active" : ""}`}
          onClick={() => navigate("/Account/profile")}
        >
          <BarItem
            name={"Account"}
            icon={<FaUserGear className="icon text-2xl" />}
          />
        </li>
        <li
          className={`side-bar-item ${isActive("/My-books") ? "active" : ""}`}
          onClick={() => navigate("/My-books")}
        >
          <BarItem
            name={"My Books"}
            icon={<SiBookstack className="icon text-2xl" />}
          />
        </li>
        <li
          className={`side-bar-item ${
            isActive("/My-favorites") ? "active" : ""
          }`}
          onClick={() => navigate("/My-favorites")}
        >
          <BarItem
            name={"My Favors"}
            icon={<GoStarFill className="icon text-2xl" />}
          />
        </li>
      </ul>
    </div>
  );
}

function BarItem({ name, icon }) {
  return (
    <div className="flex cursor-pointer flex-col items-center">
      {icon}
      <div className="text-sm lg:flex md:flex hidden">{name}</div>
    </div>
  );
}
const SidebarComp = ({ children, HandleClick }) => {
  return (
    <div
      className={`item text-md flex items-center gap-3 p-2 w-1/2 sm:w-auto sm:mx-0 mx-auto`}
      onClick={HandleClick}
    >
      {children}
    </div>
  );
};
const Popup = ({ message, onConfirm, modalIsOpen, closeModal }) => {
  return (
    <GenericModal isOpen={modalIsOpen} onClose={closeModal}>
      <div className="py-6 text-center">
        <p className="my-6">{message}</p>
        <button
          onClick={onConfirm}
          className="p-2 mr-4 hover:bg-gray-300 hover:rounded"
        >
          Yes
        </button>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-300 hover:rounded"
        >
          No
        </button>
      </div>
    </GenericModal>
  );
};
