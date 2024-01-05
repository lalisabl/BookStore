import { GoStarFill } from "react-icons/go";
import { PiGlobe } from "react-icons/pi";
import { ProfileHeader, RightSideBar } from "./side-bar";
import { FaBars, FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DropdownButton from "../../shared/dropdown";
import Select from "react-select";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import GenericModal from "../../shared/GenericModal";
import { Login, Register } from "./login-registration";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { enumCategoriesOptions, host } from "../../assets/constData";
import BackBTN from "../../shared/backbtn";

export default function UserNav() {
  const isLogin = useSelector((state) => state.store.isLogin);

  const [language, setLanguage] = useState("en");
  const isScrolled = useSelector((state) => state.store.isScrolled);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
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
  const handleSignInClick = (param) => {
    if (param) {
      setShowLoginPopup(true);
    } else {
      setShowLoginPopup(false);
      setShowRegisterPopup(true);
    }
  };

  const handleSignUpClick = (param) => {
    if (param) {
      setShowRegisterPopup(true);
    } else {
      setShowRegisterPopup(false);
      setShowLoginPopup(true);
    }
  };

  // const [isMobile, setIsMobile] = useState(false);
  const [toggleBar, setToggleBar] = useState(false);
  const user = useSelector((state) => state.store.userInfo);
  const isMobile = useSelector((state) => state.store.isMobile);
  const back = useSelector((state) => state.store.backBtn);

  return (
    <div>
      <div>
        <div className="nav w-screen right-0 account-nav fixed top-0 sm:pr-8 sm:pl-8  h-0 flex border-b">
          <div className="flex items-center  sm:gap-14">
            {isMobile && back ? <BackBTN /> : ""}
            <div onClick={() => navigate("/")}>
              <img
                className={`h-12 cursor-pointer ${
                  back && isMobile ? "hidden" : "flex"
                }`}
                src="/images/hayuu_book_store_logo_edited-removebg-preview.png"
                alt="logoPhoto"
              />
            </div>
            <div className="hidden sm:block">
              <DropdownButton
                buttonTitle={"Books"}
                dropDownContent={dropdown}
              />
            </div>
          </div>

          {isScrolled && <SearchInp />}

          <div className="flex gap-3 items-center">
            <div className="gap-3 hidden sm:flex">
              <div
                className=" flex items-center cursor-pointer"
                onClick={() => navigate("/ ")}
              >
                <FaHome className="icon text-lg" />
                Home
              </div>
              {isLogin && (
                <div
                  onClick={() => navigate("/My-favorites")}
                  className="favorites flex items-center cursor-pointer"
                >
                  <GoStarFill className="mr-1" />
                  Fav
                </div>
              )}
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
            </div>

            {isLogin ? (
              <div>
                <img
                  onClick={handleClick}
                  src={`${host}/images/users/${user.profile.picture}`}
                  className="w-10 cursor-pointer h-10 rounded-full overflow-hidden hover:border"
                  alt="userPhoto"
                />
              </div>
            ) : (
              !isScrolled && (
                <div>
                  <button
                    onClick={() => handleSignInClick(true)}
                    className="m-1 btn-primary rounded-lg p-1"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleSignUpClick(true)}
                    className="m-1 btn-primary-white rounded-lg p-1"
                  >
                    Sign Up
                  </button>
                </div>
              )
            )}

            {isMobile && !isLogin && (
              <div
                onClick={() => setToggleBar(true)}
                className="cursor-pointer text-2xl  hover:text-primary"
              >
                <FaBars />
              </div>
            )}

            {toggleBar && (
              <MobileNavBar
                dropdown={dropdown}
                show={toggleBar}
                closeBar={() => setToggleBar(false)}
              />
            )}

            {isRightSideBarVisible && isLogin && (
              <RightSideBar
                closeBar={() => {
                  setRightSideBarVisibility(false);
                }}
                show={isRightSideBarVisible}
              />
            )}

            {showLoginPopup && (
              <>
                <GenericModal
                  customStyles={!isMobile ? "" : "left"}
                  isOpen={showLoginPopup}
                  onClose={() => setShowLoginPopup(false)}
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
            {showRegisterPopup && (
              <>
                <GenericModal
                  customStyles={!isMobile ? "" : "left"}
                  isOpen={showRegisterPopup}
                  onClose={() => setShowRegisterPopup(false)}
                >
                  <Register
                    success={() => {
                      setShowRegisterPopup(false);
                    }}
                    HandleLogin={() => handleSignUpClick(false)}
                  />
                </GenericModal>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchInp() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const s = searchParams.get("q");
  const [searchQ, setSearchQ] = useState(s);
  const setSearch = (e) => {
    setSearchQ(e.target.value);
  };
  const isMobile = useSelector((state) => state.store.isMobile);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchParams.set("q", searchQ);
    // Add category parameter if it exists
    if (searchParams.has("category")) {
      navigate(`/search?${searchParams.toString()}`);
    } else {
      navigate("/search?q=" + searchQ);
    }
  };

  const handleSelectChange = (selectedOption) => {
    searchParams.set("category", selectedOption.value);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      marginRight: "3px",
    }),
  };

  return (
    <div className={`m-auto justify-center`}>
      <div className={`items-center`}>
        <form
          onSubmit={handleSearchSubmit}
          className="flex  relative items-center"
        >
          {!isMobile && (
            <Select
              styles={customStyles}
              options={enumCategoriesOptions}
              placeholder="Categories"
              onChange={handleSelectChange}
              className="z-100 sm:mr-3  mr-1"
            />
          )}

          <div className="items-center m-auto  flex">
            <input
              onChange={setSearch}
              className="p-1.5 w-32 sm:w-64 border rounded rounded-r-none border-gray-300"
              type="text"
              value={searchQ}
              title="text"
              placeholder="Search book here"
            />

            <button className="btn-primary p-1.5 text-white rounded-r-md">
              <BiSearch className=" text-2xl" />
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

function MobileNavBar({ show, closeBar, dropdown }) {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.store.isLogin);
  const [language, setLanguage] = useState("en");
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
              className="gap-3 fixed w-64 h-full bg-primary_bg right-0 top-2 p-3 flex flex-col"
            >
              <div
                onClick={() => {
                  setShow(false);
                  setTimeout(closeBar, 1000);
                }}
              >
                <MdClose className="text-right" />
              </div>

              <div>
                <img
                  className="w-16 hidden sm:flex"
                  src="/images/pre-logo.png"
                  alt="logoPhoto"
                />
              </div>
              <div
                className=" flex items-center cursor-pointer"
                onClick={() => navigate("/ ")}
              >
                <FaHome className="icon text-lg" />
                Home
              </div>

              <DropdownButton
                buttonTitle={"Books"}
                dropDownContent={dropdown}
              />
              {isLogin && (
                <div
                  onClick={() => navigate("/My-favorites")}
                  className="favorites flex items-center cursor-pointer"
                >
                  <GoStarFill className="mr-1" />
                  Fav
                </div>
              )}
              <div className="langueges flex items-center">
                <PiGlobe className="mr-1" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border-none focus:outline-none"
                >
                  <option value="en">en</option>
                  <option value="es">oro</option>
                  <option value="fr">amh</option>
                </select>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
