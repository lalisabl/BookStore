import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { HomeBanner } from "../user/user-home";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { BiFilter } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { setListView } from "../../redux/actions";
import { BookGrid } from "./BookGrid";
import { LoadingCardList, LoadingCardVert } from "../../shared/LoadingCard";
import InfiniteScroll from "react-infinite-scroll-component";

export function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [error, setError] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    setCurrentPage(0);
    fetchData();
  }, []);

  const fetchData = () => {
    if (hasMore) {
      axios
        .get(`${apiurl}/books/get?${searchParams}&page=${currentPage + 1}`)
        .then((response) => {
          if (response.data.data.Books.length > 0) {
            setBooks((prevBooks) => [
              ...prevBooks,
              ...response.data.data.Books,
            ]);
          } else {
            setHasMore(false);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const isList = useSelector((state) => state.store.isList);
  const refresh = () => {
    setBooks([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchData();
  };

  return (
    <div>
      <HomeBanner />
      <div
        style={{ minHeight: "50vh" }}
        className="pl-3 pr-3 pb-24 bg-white w-screen"
      >
        <Filter_View />

        <>
          <InfiniteScroll
            dataLength={books.length}
            next={fetchData}
            hasMore={hasMore}
            loader={
              <>
                {isList ? (
                  <div className="grid grid-cols-1 m-auto md:grid-cols-2 gap-3 lg:w-5/6 sm:w-full">
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                    <LoadingCardList />
                  </div>
                ) : (
                  <div className="gap-3 grid sm:grid-cols-3 lg:grid-cols-8  md:grid-cols-5 grid-cols-2">
                    <LoadingCardVert />
                    <LoadingCardVert />
                    <LoadingCardVert /> <LoadingCardVert />
                    <LoadingCardVert /> <LoadingCardVert />
                    <LoadingCardVert /> <LoadingCardVert />
                    <LoadingCardVert /> <LoadingCardVert />
                    <LoadingCardVert />
                    <LoadingCardVert />
                  </div>
                )}
              </>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            {isList ? <BookList books={books} /> : <BookGrid books={books} />}
          </InfiniteScroll>
        </>

        {error && (
          <div className="m-2 p-4 bg-red-200 bg-opacity-60 text-red-800 text-center  rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export function Filter_View() {
  const dispatch = useDispatch();
  const isScrolled = useSelector((state) => state.store.isScrolled);
  const isList = useSelector((state) => state.store.isList);

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
        isScrolled ? "fixed z-1-m top-12 shadow-none border-b" : ""
      }`}
    >
      <div
        onClick={() => dispatch(setListView(!isList))}
        className="flex cursor-pointer items-center mr-1 hover:text-primary"
      >
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
