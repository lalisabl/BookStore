import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { LoadingCardList } from "../../shared/LoadingCard";
import GetBooks from "./getBooks";
import { BookGrid } from "./BookGrid";

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
      <div className="category-item text-right">
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

        <div className="inline-block p-1 pr-4 pl-4 mt-4 rounded-full cursor-pointer btn-transparent">
          ...more
        </div>
      </div>
      <div className="category-item text-right">
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
        <div className="inline-block  p-1 pr-4 pl-4 mt-4 rounded-full cursor-pointer btn-transparent">
          ...more
        </div>
      </div>
      <div className="category-item text-right">
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
        <div className="inline-block p-1 pr-4 pl-4 mt-4 rounded-full cursor-pointer btn-transparent">
          ...more
        </div>
      </div>
    </div>
  );
}

export function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div className="m-3">
      <h1 className="text-3xl mb-3">Featured Books</h1>
      <BookGrid books={books.slice(0, 8)} />
    </div>
  );
}
