import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";

export function BookCategory() {
  const [activeButton, setActiveButton] = useState("Most Popular");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiurl}/books/get`)
      .then((res) => {
        setBooks(res.data.data.Books);
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <BookCategoryDisplay books={books} />
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
