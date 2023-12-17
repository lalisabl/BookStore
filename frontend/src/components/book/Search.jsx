import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeBanner } from "../user/user-home";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookGrid } from "./BookGrid";
import { BookList } from "./BookList";
import { BiFilter } from "react-icons/bi";
import { useSelector } from "react-redux";

export function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newURL = `${location.pathname}?${searchParams}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiurl}/books/get?${searchParams}`)
      .then((response) => {
        setBooks(response.data.data.Books);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [newURL]);
  return (
    <div>
      <HomeBanner />
      <div style={{ minHeight: "50vh" }} className="bg-white w-full">
        <Filter />
        <BookList books={books} />
      </div>
    </div>
  );
}

function Filter() {
  const isScrolled = useSelector((state) => state.scroll.isScrolled);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`mb-3 w-24 ${isScrolled ? "fixed top-12" : ""}`}
    >
      <div
        className={`p-1 flex rounded-md bg-gray-100 border ${
          isScrolled ? "shadow-none border-b" : ""
        }`}
      >
        <div onClick={toggleDropdown} className="relative flex">
          Filters
          <BiFilter className="text-2xl cursor-pointer ml-1" />
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-50 w-60 mt-1 p-2 bg-white border rounded-md shadow-md">
          {/* Add your dropdown content here */}
          <label className="block mb-1">Filter 1</label>
          <input type="checkbox" className="mr-1" /> Option 1
          <br />
          <input type="checkbox" className="mr-1" /> Option 2
          <br />
          {/* Add more filter options as needed */}
        </div>
      )}
    </div>
  );
}
