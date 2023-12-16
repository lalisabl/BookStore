import React, { useEffect, useState } from "react";
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
      <div className="bg-white max-h-fit">
        <Filter />
        <BookList books={books} />
      </div>
    </div>
  );
}

function Filter() {
  const isScrolled = useSelector((state) => state.scroll.isScrolled);
  return (
    <div
      className={`p-1 flex rounded-md bg-gray-100 mb-3 w-24 border ${
        isScrolled ? " shadow-none fixed flex border-b top-12" : ""
      }`}
    >
      Filters
      <BiFilter className="text-2xl cursor-pointer" />
    </div>
  );
}
