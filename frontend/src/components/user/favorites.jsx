import { useSelector } from "react-redux";
import { BookGrid } from "../book/BookGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
const Favorites = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios(`${apiurl}/favorites/`, { withCredentials: true })
      .then((response) => {
        console.log(response.data.data);
        setBooks(response.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching favorites", err);
      });
  }, []);

  return (
    <div className="p-4 sm:mt-4 lg:mt-8">
      {books?.length > 0 && <BookGrid books={books} />}
    </div>
  );
};
export default Favorites;
