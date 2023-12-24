import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { LoadingCardList } from "../../shared/LoadingCard";

export function BookCategory() {
  const [activeButton, setActiveButton] = useState("Most Popular");
  const [loading, setLoading] = useState(true);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiurl}/books/get`)
      .then((res) => {
        setBooks(res.data.data.Books);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="category-container">
      <h2 className=" text-3xl">Explore Exciting Book Categories</h2>
      <div className="category-nav flex flex-row gap-3">
        <div
          className={` rounded-lg text- p-1 cursor-pointer btn-transparent ${
            activeButton === "Most Popular" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Most Popular")}
        >
          Most Popular
        </div>
        <div
          className={` rounded-lg text- p-1 cursor-pointer btn-transparent ${
            activeButton === "Best Viewed" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Best Viewed")}
        >
          Best Viewed
        </div>
        <div
          className={` rounded-lg text- p-1 cursor-pointer btn-transparent ${
            activeButton === "Top Rated" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Top Rated")}
        >
          Top Rated
        </div>
        <div
          className={` rounded-lg text- p-1 cursor-pointer btn-transparent ${
            activeButton === "New Books" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("New Books")}
        >
          New Books
        </div>
      </div>
      <BookCategoryDisplay books={books} loading={loading} />
    </div>
  );
}

function BookCategoryDisplay({ books, loading }) {
  return (
    <div className="top-category">
      <div className="category-item">
        <h1 className="text-2xl mb-3">Fiction</h1>
        {loading ? (
          <div className="grid grid-cols-1 m-auto">
            <LoadingCardList />
            <LoadingCardList />
            <LoadingCardList />
          </div>
        ) : (
          <>
            <BookList books={books.slice(0, 3)} />
          </>
        )}

        <span className=" rounded-lg text- p-1 cursor-pointer btn-transparent btn">
          ...more
        </span>
      </div>
      <div className="category-item">
        <h1 className=" text-2xl mb-3">Novels</h1>
        {loading ? (
          <div className="grid grid-cols-1 m-auto">
            <LoadingCardList />
            <LoadingCardList />
            <LoadingCardList />
          </div>
        ) : (
          <>
            <BookList books={books.slice(0, 3)} />
          </>
        )}
        <span className=" rounded-lg text- p-1 cursor-pointer btn-transparent btn">
          ...more
        </span>
      </div>
      <div className="category-item">
        <h1 className=" text-2xl mb-3">Academic</h1>
        {loading ? (
          <div className="grid grid-cols-1 m-auto">
            <LoadingCardList />
            <LoadingCardList />
            <LoadingCardList />
          </div>
        ) : (
          <>
            <BookList books={books.slice(0, 3)} />
          </>
        )}
        <span className=" rounded-lg text- p-1 cursor-pointer btn-transparent btn">
          ...more
        </span>
      </div>
    </div>
  );
}
