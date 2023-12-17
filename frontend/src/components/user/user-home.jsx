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

export default function UserHome() {
  return (
    <div>
      <HomeBanner />
      <div className="bg-white">
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
  const isScrolled = useSelector((state) => state.scroll.isScrolled);

  const handleScroll = () => {
    const scrolled = window.scrollY > 100;
    dispatch(setScrollState(scrolled));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <div
          className="bg-cover -z-50 top-10 left-16 ml-2 fixed inset-0 max-h-64 w-screen"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

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
      <BookGrid />
      <GetBooks />
    </>
  );
}
