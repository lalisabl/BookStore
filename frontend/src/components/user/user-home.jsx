import { BiSearch } from "react-icons/bi";
import { BookGrid } from "../book/BookGrid";
import GetBooks from "../book/getBooks";
import bgImage from "../../assets/images/Book-Banner.jpg";

import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScrollState } from "../../redux/actions";
import { FaSearch } from "react-icons/fa";
import { enumCategoriesOptions } from "../../assets/constData";
import { Filter_View } from "../book/Search";

export default function UserHome() {
  return (
    <div>
      <HomeBanner />

      <div className="bg-white">
        <Filter_View />
        <Recommended />
      </div>
    </div>
  );
}

export function HomeBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const s = searchParams.get("q");
  const [searchQ, setSearchQ] = useState(s);
  const setSearch = (e) => {
    setSearchQ(e.target.value);
  };
  const [SearchParams, setSearchParams] = useState("");

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
      padding: "6px",
    }),
  };

  const dispatch = useDispatch();

  const handleScroll = () => {
    const scrolled = window.scrollY > 100;
    dispatch(setScrollState(scrolled));
  };

  useEffect(() => {
    dispatch(setScrollState(false));
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <div
          className="bg-cover bg-center -z-50 top-10 left-0 sm:left-10 md:left-16 ml-0 sm:ml-2 fixed inset-0 h-96  w-screen banner-bg"
          style={{ backgroundImage: `url("/images/searchb1.jpg")` }}
        >
          <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60"></div>
        </div>

        <div
          className={`p-10 m-auto justify-center items-center flex flex-col gap-2`}
        >
          <div className={`items-center`}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex  relative items-center"
            >
              <Select
                styles={customStyles}
                options={enumCategoriesOptions}
                placeholder="Categories"
                onChange={handleSelectChange}
                className="z-100 mr-3"
              />
              <span className="items-center">
                <input
                  onChange={setSearch}
                  className="p-3  banner-search border rounded rounded-r-none border-gray-300"
                  type="text"
                  value={searchQ}
                  title="text"
                  placeholder="Search book here"
                />
                <button className="p-3  btn-primary text-white rounded-r-md">
                  Search
                </button>
              </span>
            </form>
          </div>
          <SearchRecommenderTag />
        </div>
      </div>
    </>
  );
}

function SearchRecommenderTag() {
  const recommended = [`top new book`, "chemistry", "poetry", "handout"];
  return (
    <div className="flex gap-3">
      {recommended.map((s, index) => (
        <div key={index}>
          <span className="border  bg-gray-50 bg-opacity-30 hover:bg-opacity-40 pl-3 pr-3 items-center rounded-full flex cursor-pointer">
            <FaSearch className="mr-2" /> {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function Recommended() {
  return (
    <>
      <GetBooks />
    </>
  );
}
