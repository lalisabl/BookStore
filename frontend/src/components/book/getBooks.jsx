import axios from "axios";
import { useEffect, useState } from "react";
import { apiurl } from "../../assets/constData";
import { BookList } from "./BookList";

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
  return (
    <div>
      <BookList books={books} />
    </div>
  );
}
