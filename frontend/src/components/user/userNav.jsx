import { GoStarFill } from "react-icons/go";
import { PiGlobe } from "react-icons/pi";
import { RightSideBar } from "./side-bar";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DropdownButton from "../../shared/dropdown";
import Select from "react-select";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function UserNav() {
  const [language, setLanguage] = useState("en");
  const isScrolled = useSelector((state) => state.store.isScrolled);
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
        <div className="nav account-nav fixed top-0 left-0 w-full h-0 flex border-b">
          <div className="nav-right flex items-center gap-0">
            <img
              className="logo w-16"
              src="/images/pre-logo.png"
              alt="logoPhoto"
            />
            <DropdownButton buttonTitle={"Books"} dropDownContent={dropdown} />
          </div>
          {isScrolled && <SearchInp /> }
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

function SearchInp() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const s = searchParams.get("q");
  const [searchQ, setSearchQ] = useState(s);
  const setSearch = (e) => {
    setSearchQ(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchParams.set("q", searchQ);
    const updatedSearchParams = searchParams.toString();
    navigate("/search?" + updatedSearchParams);
  };

  const handleSelectChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];

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
          <Select
            styles={customStyles}
            options={options}
            placeholder="Categories"
            onChange={handleSelectChange}
            className="z-100 mr-3"
          />
          <div className="items-center  flex">
            <input
              onChange={setSearch}
              className="p-1.5 w-64 border rounded rounded-r-none border-gray-300"
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
