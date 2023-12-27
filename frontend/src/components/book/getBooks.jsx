import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { useSelector } from "react-redux";
import { BookGrid } from "./BookGrid";
import { LoadingCardList, LoadingCardVert } from "../../shared/LoadingCard";

export default function GetBooks() {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${apiurl}/books/get`)
      .then((res) => {
        setBooks(res.data.data.Books);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const isList = useSelector((state) => state.store.isList);
  return (
    <div className="pl-3 pr-3">
      {loading ? (
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
      ) : (
        <>{isList ? <BookList books={books} /> : <BookGrid books={books} />}</>
      )}
    </div>
  );
}
