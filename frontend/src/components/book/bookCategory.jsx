import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { LoadingCardList } from "../../shared/LoadingCard";
import GetBooks from "./getBooks";
import { BookGrid } from "./BookGrid";
import { useNavigate } from "react-router-dom";

export function BookCategory() {
  const [activeButton, setActiveButton] = useState("Most Popular");
  const [loading, setLoading] = useState(true);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const [Fictions, setFictions] = useState([]);
  const [Academic, setAcademic] = useState([]);
  const [NonFiction, setNonFiction] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${apiurl}/books/get?category=Fiction`).then((res) => {
        setFictions(res.data.data.Books);
      });
      axios.get(`${apiurl}/books/get?category=Non-Fiction`).then((res) => {
        setNonFiction(res.data.data.Books);
      });
      axios
        .get(`${apiurl}/books/get?category=Education`)
        .then((res) => {
          setAcademic(res.data.data.Books);
        })
        .then((a) => {
          setLoading(false);
        });
    } catch (e) {
      console.log();
    }
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
      <BookCategoryDisplay
        loading={loading}
        Academic={Academic}
        Fictions={Fictions}
        NonFiction={NonFiction}
      />
    </div>
  );
}

function BookCategoryDisplay({ Academic, Fictions, NonFiction, loading }) {
  const navigate = useNavigate();
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
            <BookList books={Fictions?.slice(0, 3)} />
          </>
        )}

        <div
          onClick={() => {
            navigate("/search?category=Fiction");
          }}
          className="inline-block p-1 pr-4 pl-4 mt-4 rounded-full cursor-pointer btn-transparent"
        >
          ...more
        </div>
      </div>
      <div className="category-item text-right">
        <h1 className=" text-2xl mb-3">Others</h1>
        {loading ? (
          <div className="grid grid-cols-1 m-auto">
            <LoadingCardList />
            <LoadingCardList />
            <LoadingCardList />
          </div>
        ) : (
          <>
            <BookList books={NonFiction?.slice(0, 3)} />
          </>
        )}
        <div
          onClick={() => {
            navigate("/search?category=Graphic Novels/Comics");
          }}
          className="inline-block  p-1 pr-4 pl-4 mt-4 rounded-full cursor-pointer btn-transparent"
        >
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
            <BookList books={Academic?.slice(0, 3)} />
          </>
        )}
        <div
          onClick={() => {
            navigate("/search?category=Education");
          }}
          className="inline-block p-1 pr-4 pl-4 mt-4 rounded-full cursor-pointer btn-transparent"
        >
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
