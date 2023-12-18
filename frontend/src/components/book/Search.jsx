import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeBanner } from "../user/user-home";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { BiFilter } from "react-icons/bi";
import { useSelector } from "react-redux";
import { BsFillGrid1X2Fill } from "react-icons/bs";

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
  const isScrolled = useSelector((state) => state.store.isScrolled);
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
      className={`pl-2 pr-2 flex items-center mb-3  rounded-md bg-gray-100 border ${
        isScrolled ? "fixed top-12 shadow-none border-b" : ""
      }`}
    >
      <div className="flex cursor-pointer items-center mr-1 hover:text-primary">
        <BsFillGrid1X2Fill className="mr-1" />
        view
      </div>
      <div className={`p-1 flex cursor-pointer  ${isScrolled ? "" : ""}`}>
        <div
          onClick={toggleDropdown}
          className="relative hover:text-primary flex"
        >
          <BiFilter className="text-2xl" />
          Filters
        </div>

        {isDropdownOpen && (
          <div className="absolute z-50 w-60 mt-7 p-2 bg-gray-100 border rounded-md shadow-md">
            {/* Add your dropdown content here */}
            <label className="block mb-1">Filter 1</label>
            <input type="checkbox" className="mr-1" />
            <br />
            <input type="checkbox" className="mr-1" /> Option 2
            <br />
            {/* Add more filter options as needed */}
            <button className="rounded-md btn-primary">Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}
