import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";
import { useSelector } from "react-redux";
import { BookGrid } from "./BookGrid";

export default function GetBooks() {
  const [books, setBooks] = useState();
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

  const isList = useSelector((state) => state.store.isList);
  return (
    <div className="pl-3 pr-3">
      {isList ? <BookList books={books} /> : <BookGrid books={books} />}
    </div>
  );
}
