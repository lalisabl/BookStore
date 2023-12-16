import React, { useState } from "react";
import { BooksSample } from "../../assets/constData";
import { BookList, formatViews } from "./BookList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";

export function BookCategory() {
  const [activeButton, setActiveButton] = useState("Most Popular");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="category-container">
      <h2>Explore Exciting Book Categories</h2>
      <div className="category-nav">
        <div
          className={`btn btn-transparent ${
            activeButton === "Most Popular" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Most Popular")}
        >
          Most Popular
        </div>
        <div
          className={`btn btn-transparent ${
            activeButton === "Best Viewed" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Best Viewed")}
        >
          Best Viewed
        </div>
        <div
          className={`btn btn-transparent ${
            activeButton === "Top Rated" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Top Rated")}
        >
          Top Rated
        </div>
        <div
          className={`btn btn-transparent ${
            activeButton === "New Books" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("New Books")}
        >
          New Books
        </div>
      </div>
      {/* <BookCategoryDisplay books={BooksSample.books} /> */}
    </div>
  );
}

function BookCategoryDisplay({ books }) {
  return (
    <div className="top-category">
      <div className="category-item">
        <h1>Fiction</h1>
        <BookList books={books.slice(0, 3)} />
        <span className="btn-transparent btn">...more</span>
      </div>
      <div className="category-item">
        <h1>Novels</h1>
        <BookList books={books.slice(0, 3)} />
        <span className="btn-transparent btn">...more</span>
      </div>
      <div className="category-item">
        <h1>Academic</h1>
        <BookList books={books.slice(0, 3)} />
        <span className="btn-transparent btn">...more</span>
      </div>
    </div>
  );
}
