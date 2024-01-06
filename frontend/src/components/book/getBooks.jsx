import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { useSelector } from "react-redux";
import { BookGrid } from "./BookGrid";
import { LoadingCardList, LoadingCardVert } from "../../shared/LoadingCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GetBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiurl}/books/get?page=${currentPage + 1}`)
      .then((response) => {
        if (response.data.data.Books.length > 0) {
          setBooks((prevBooks) => [...prevBooks, ...response.data.data.Books]);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // setError(error.message);
      });
  }, [currentPage]);

  const fetchData = () => {
    if (hasMore) {
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
    <div className="pl-3 pr-3 pb-14">
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
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {isList ? <BookList books={books} /> : <BookGrid books={books} />}
        </InfiniteScroll>{" "}
      </>
    </div>
  );
}
